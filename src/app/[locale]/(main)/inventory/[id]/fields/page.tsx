"use client";
import { InventoryFieldsView } from "@/components/inventory/fields/view";
import { trpc } from "@/lib/trpc";
import { Text } from "@radix-ui/themes";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ id: string }>();

  const { data: fields, isLoading } =
    trpc.inventoryField.findManyByInventoryId.useQuery(
      {
        id: params!.id,
      },
      { enabled: !!params },
    );

  const { mutateAsync } = trpc.inventoryField.manage.useMutation();

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <InventoryFieldsView
      fields={fields || []}
      onSave={async (fields) => {
        await mutateAsync({ id: params!.id, fields });
      }}
    />
  );
}
