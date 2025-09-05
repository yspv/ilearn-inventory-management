"use client";
import { useSaveWithStatus } from "@/components/auto-save/provider";
import { InventoryItemsItemView } from "@/components/inventory/items/item-view";
import { useInventory } from "@/components/inventory/provider";
import { trpc } from "@/lib/trpc";
import { InventoryItem, User } from "@prisma/client";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ "custom-id": string }>();
  const { inventory } = useInventory();

  const { data: fields } = trpc.inventoryField.findManyByInventoryId.useQuery({
    id: inventory.id,
  });

  const { data: item, isLoading } = trpc.inventoryItem.findUnique.useQuery<
    InventoryItem & { owner: User }
  >({
    where: {
      inventoryId_customId: {
        inventoryId: inventory.id,
        customId: decodeURIComponent(params!["custom-id"]),
      },
    },
    include: { owner: true },
  });

  const { mutateAsync } = trpc.inventoryItem.update.useMutation();

  const handleSave = useSaveWithStatus(async (changes: any) => {
    mutateAsync({ where: { id: item!.id }, data: changes });
  });

  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <InventoryItemsItemView
      item={item!}
      owner={item!.owner}
      fields={fields?.fields.sort((a, b) => a.orderIndex - b.orderIndex) || []}
      onSave={handleSave}
    />
  );
}
