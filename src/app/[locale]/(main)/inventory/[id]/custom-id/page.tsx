"use client";
import { trpc } from "@/lib/trpc";
import { InventoryCustomIdView } from "@/components/inventory/custom-id/view";
import { useInventory } from "@/components/inventory/provider";
import { useErrorToaster } from "@/hooks/use-error-toaster";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { Loader } from "@/components/loader";

export default function Page() {
  const { inventory } = useInventory();

  const trpcUtils = trpc.useUtils();
  const t = useTranslations("labels");

  const { data, isLoading, isFetching, refetch } =
    trpc.customIdField.findManyByInventoryId.useQuery({ id: inventory.id });

  const errorToast = useErrorToaster({
    CONFLICT: { label: t("reload"), action: refetch },
  });

  const { mutateAsync } = trpc.customIdField.reorder.useMutation({
    onSuccess: (data) => {
      trpcUtils.customIdField.findManyByInventoryId.setData(
        { id: inventory.id },
        data,
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
    <InventoryCustomIdView
      example={data?.id}
      fields={data?.fields || []}
      onSave={async (fields) => {
        return mutateAsync({
          id: inventory.id,
          version: data?.version,
          fields,
        });
      }}
    />
  );
}
