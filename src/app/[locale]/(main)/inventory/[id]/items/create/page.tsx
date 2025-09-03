"use client";
import { useSaveWithStatus } from "@/components/auto-save/provider";
import { InventoryItemCreateView } from "@/components/inventory/items/item-create-view";
import { useInventory } from "@/components/inventory/provider";
import { useRouter } from "@/i18n/navigation";
import { trpc } from "@/lib/trpc";

export default function Page() {
  const router = useRouter();
  const { inventory } = useInventory();
  const { data: fields, isLoading } =
    trpc.inventoryField.findManyByInventoryId.useQuery({ id: inventory.id });

  const { mutateAsync } = trpc.inventoryItem.create.useMutation();

  const createItem = useSaveWithStatus(async (data: any) => {
    return mutateAsync({ inventoryId: inventory.id, data }).then(
      ({ customId }) =>
        router.push(`/inventory/${inventory.id}/items/${customId}`),
    );
  });

  if (isLoading) {
    return <>Loading...</>;
  }
  return <InventoryItemCreateView fields={fields || []} onSave={createItem} />;
}
