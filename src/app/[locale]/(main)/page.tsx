"use client";
import { InventoryMainView } from "@/components/inventory/main-view";
import { trpc } from "@/lib/trpc";

export default function Page() {
  const { data: latest } = trpc.inventory.findMany.useQuery({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { owner: true, category: true },
  });
  const { data: top } = trpc.inventory.findMany.useQuery({
    take: 5,
    orderBy: { items: { _count: "desc" } },
    include: { owner: true, category: true },
  });

  return (
    <InventoryMainView top={top?.items || []} latest={latest?.items || []} />
  );
}
