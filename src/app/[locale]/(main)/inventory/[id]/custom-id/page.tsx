"use client";
import { Text } from "@radix-ui/themes";
import React from "react";
import { trpc } from "@/lib/trpc";
import { InventoryCustomIdView } from "@/components/inventory/custom-id/view";
import { useInventory } from "@/components/inventory/provider";
import { useErrorToaster } from "@/hooks/use-error-toaster";
import { notFound } from "next/navigation";

export default function Page() {
  const errorToast = useErrorToaster();
  const { inventory } = useInventory();
  const trpcUtils = trpc.useUtils();
  const { data, isLoading, isFetching, refetch } =
    trpc.customIdField.findManyByInventoryId.useQuery({ id: inventory.id });
  const { mutateAsync } = trpc.customIdField.reorder.useMutation({
    onSuccess: (data) => {
      trpcUtils.customIdField.findManyByInventoryId.setData(
        { id: inventory.id },
        data,
      );
    },
    onError: ({ data }) => {
      errorToast(data!.code);
      refetch();
    },
  });

  if (isLoading || isFetching) {
    return <Text>Loading</Text>;
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
