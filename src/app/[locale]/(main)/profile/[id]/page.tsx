"use client";
import { useParams } from "next/navigation";
import React from "react";
import { ProfileView } from "@/components/profile/view";
import { useUserInventory } from "@/hooks/use-user-inventory";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { inventories, sort, filter, fetchNextPage } = useUserInventory(
    params?.id,
  );

  return (
    <ProfileView
      data={inventories || []}
      defaultFilter="anyone"
      onFilterChange={filter}
      onSortChange={sort}
      loadMore={() => fetchNextPage()}
    />
  );
}
