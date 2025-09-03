"use client";
import { InventorySettingsView } from "@/components/inventory/settings/view";
import { trpc } from "@/lib/trpc";
import { Text } from "@radix-ui/themes";
import { useParams } from "next/navigation";
import lodash from "lodash";
import { Category, Inventory, Tag } from "@prisma/client";
import { useInventory } from "@/components/inventory/provider";

function buildCategoryInput(category?: { name: string }) {
  if (!category) return;
  const name = category.name.toLowerCase();
  return {
    connectOrCreate: {
      where: { name },
      create: { name },
    },
  };
}

function buildTagsInput(currentTags: Tag[], newTags?: { name: string }[]) {
  if (!newTags) return;
  const deletedTags = lodash.differenceBy(currentTags, newTags, "name");
  return {
    disconnect: deletedTags,
    connectOrCreate: newTags.map(({ name }) => ({
      where: { name },
      create: { name },
    })),
  };
}

export default function Page() {
  const params = useParams<{ id: string }>();
  const { update } = useInventory();
  const { data: inventory, isLoading } = trpc.inventory.findUnique.useQuery<
    Inventory & { tags: Tag[] } & { category: Category }
  >(
    { where: { id: params!.id }, include: { tags: true, category: true } },
    { enabled: !!params },
  );

  const { mutateAsync } = trpc.inventory.update.useMutation({
    onSuccess: update,
  });

  if (isLoading || !inventory) {
    return <Text>Loading...</Text>;
  }

  return (
    <InventorySettingsView
      inventory={inventory}
      tags={inventory.tags}
      category={inventory.category}
      onUpdate={async (data) => {
        const input: Record<string, any> = {
          title: data.title,
          description: data.description,
          isPrivate: data.isPrivate,
          category: buildCategoryInput(data.category),
          tags: buildTagsInput(inventory.tags, data.tags),
        };

        await mutateAsync({ where: { id: params!.id }, data: input });
      }}
    />
  );
}
