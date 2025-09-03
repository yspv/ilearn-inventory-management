"use client";
import { Text } from "@radix-ui/themes";
import React from "react";
import { trpc } from "@/lib/trpc";
import { useParams } from "next/navigation";
import { InventoryCustomIdView } from "@/components/inventory/custom-id/view";

export default function Page() {
  const params = useParams<{ id: string }>();
  const trpcContext = trpc.useContext();
  const { data, isLoading } = trpc.customIdField.findManyByInventoryId.useQuery(
    { id: params!.id },
    { enabled: !!params },
  );
  const { mutateAsync } = trpc.customIdField.update.useMutation({
    onSuccess: ({ id, fields }) => {
      trpcContext.customIdField.findManyByInventoryId.setData(
        { id: params!.id },
        { id, fields },
      );
    },
  });
  if (isLoading) {
    return <Text>Loading</Text>;
  }
  return (
    <InventoryCustomIdView
      example={data?.id}
      fields={data?.fields || []}
      onSave={async (fields) => {
        mutateAsync({ id: params!.id, fields });
      }}
    />
  );
}
