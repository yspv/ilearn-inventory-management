"use client";
import { InventorySettingsView } from "@/components/inventory/settings/view";
import { trpc } from "@/lib/trpc";
import { useInventory } from "@/components/inventory/provider";
import { useErrorToaster } from "@/hooks/use-error-toaster";
import { useTranslations } from "next-intl";
import { buildCategoryInput, buildTagsInput } from "@/utils";

export default function Page() {
  const t = useTranslations("labels");
  const { inventory, tags, category, update, refetch } = useInventory();

  const errorToast = useErrorToaster({
    CONFLICT: {
      label: t("reload"),
      action: refetch,
    },
  });

  const { mutateAsync } = trpc.inventory.update.useMutation({
    onSuccess: update,
    onError: ({ data }) => {
      errorToast(data?.code);
    },
  });

  return (
    <InventorySettingsView
      inventory={inventory}
      tags={tags}
      category={category}
      onUpdate={async (data) => {
        const input: Record<string, any> = {
          title: data.title,
          description: data.description,
          isPrivate: data.isPrivate,
          category: buildCategoryInput(data.category),
          tags: buildTagsInput(tags, data.tags),
        };

        await mutateAsync({
          id: inventory.id,
          version: inventory.version,
          data: input,
        });
      }}
    />
  );
}
