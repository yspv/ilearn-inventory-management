"use client";
import { useInventory } from "@/components/inventory/provider";
import { InventoryStatsView } from "@/components/inventory/stats/view";
import { trpc } from "@/lib/trpc";

export default function Page() {
  const { inventory } = useInventory();
  const { data: stats } = trpc.inventory.stats.useQuery({ id: inventory.id });
  return (
    <InventoryStatsView
      total={stats?.total || 0}
      numerics={stats?.numeric || []}
      strings={stats?.strings || []}
    />
  );
}
