"use client";
import {} from "@/components/auto-save/provider";
import { InventoryCreateType } from "@/components/inventory/create/schema";
import { InventoryCreateView } from "@/components/inventory/create/view";
import { useRouter } from "@/i18n/navigation";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const { mutate: createInventory } = trpc.inventory.create.useMutation({
    onSuccess: (data) => {
      toast("Inventory created successfully");
      router.push(`/inventory/${data.id}/items`);
    },
  });
  function handleSave(data: InventoryCreateType) {
    createInventory({
      data: {
        title: data.title,
        description: data.description,
        isPrivate: data.isPrivate,
        category: {
          connectOrCreate: {
            where: { name: data.category },
            create: { name: data.category },
          },
        },
        tags: {
          connectOrCreate: data.tags.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
    });
  }
  return <InventoryCreateView onSave={handleSave} />;
}
