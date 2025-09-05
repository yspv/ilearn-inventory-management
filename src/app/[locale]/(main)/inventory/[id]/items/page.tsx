"use client";
import { InventoryItemsView } from "@/components/inventory/items/view";
import { useInventory } from "@/components/inventory/provider";
import { trpc } from "@/lib/trpc";
import React from "react";

export default function Page() {
  const { inventory } = useInventory();
  const { data: fields, isLoading } =
    trpc.inventoryField.findManyByInventoryId.useQuery({ id: inventory.id });

  const { data: items, fetchNextPage } =
    trpc.inventoryItem.findMany.useInfiniteQuery(
      { take: 50, where: { inventoryId: inventory.id } },
      { getNextPageParam: ({ nextCursor }) => nextCursor },
    );

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <InventoryItemsView
      inventory={inventory}
      fields={fields?.fields || []}
      items={items?.pages.flatMap((i) => i.items) || []}
      onLoadMore={fetchNextPage}
    />
  );
}
