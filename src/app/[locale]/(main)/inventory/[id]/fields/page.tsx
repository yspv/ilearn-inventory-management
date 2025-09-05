"use client";
import { InventoryFieldsView } from "@/components/inventory/fields/view";
import { useInventory } from "@/components/inventory/provider";
import { Loader } from "@/components/loader";
import { useErrorToaster } from "@/hooks/use-error-toaster";
import { trpc } from "@/lib/trpc";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";

export default function Page() {
  const t = useTranslations("labels");
  const { inventory } = useInventory();
  const trpcUtils = trpc.useUtils();
  const { data, isLoading, isFetching, refetch } =
    trpc.inventoryField.findManyByInventoryId.useQuery({
      id: inventory.id,
    });

  const errorToast = useErrorToaster({
    CONFLICT: {
      label: t("reload"),
      action: refetch,
    },
  });

  const { mutateAsync } = trpc.inventoryField.manage.useMutation({
    onSuccess: (data) => {
      trpcUtils.inventoryField.findManyByInventoryId.setData(
        {
          id: inventory.id,
        },
        (prev) => (prev ? { ...prev, version: data.version } : prev),
      );
    },
    onError: ({ data }) => {
      errorToast(data?.code);
    },
  });

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (!data) {
    notFound();
  }

  return (
    <InventoryFieldsView
      fields={data?.fields || []}
      onSave={async (fields) => {
        await mutateAsync({
          id: inventory.id,
          version: data.version,
          fields,
        });
      }}
    />
  );
}
