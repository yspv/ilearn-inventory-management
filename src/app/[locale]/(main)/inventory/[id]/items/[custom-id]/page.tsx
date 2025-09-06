"use client";
import { useSaveWithStatus } from "@/components/auto-save/provider";
import { InventoryItemsItemView } from "@/components/inventory/items/item-view";
import { useInventory } from "@/components/inventory/provider";
import { Loader } from "@/components/loader";
import { useErrorToaster } from "@/hooks/use-error-toaster";
import { trpc } from "@/lib/trpc";
import { InventoryItem, User } from "@prisma/client";
import { useTranslations } from "next-intl";
import { notFound, useParams } from "next/navigation";

export default function Page() {
  const t = useTranslations("labels");
  const trpcUtils = trpc.useUtils();
  const params = useParams<{ "custom-id": string }>();
  const { inventory, refetch } = useInventory();

  const id = {
    inventoryId: inventory.id,
    customId: decodeURIComponent(params!["custom-id"]),
  };

  const errorToast = useErrorToaster({
    CONFLICT: {
      label: t("reload"),
      action: refetch,
    },
  });

  const { data: fields } = trpc.inventoryField.findManyByInventoryId.useQuery({
    id: inventory.id,
  });

  const {
    data: item,
    isLoading,
    isFetching,
  } = trpc.inventoryItem.findUnique.useQuery<InventoryItem & { owner: User }>({
    where: {
      inventoryId_customId: id,
    },
    include: { owner: true },
  });

  const { mutateAsync } = trpc.inventoryItem.update.useMutation({
    onSuccess: (data) =>
      trpcUtils.inventoryItem.findUnique.setData(
        { where: { inventoryId_customId: id } },
        data,
      ),
    onError: ({ data }) => errorToast(data?.code),
  });

  const handleSave = useSaveWithStatus((data: any) => {
    return mutateAsync({
      id: item!.id,
      inventoryVersion: fields!.version,
      version: item!.version,
      data,
    });
  });

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (!item) {
    notFound();
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
