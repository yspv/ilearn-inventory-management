"use client";
import { useParams } from "next/navigation";
import React from "react";
import { ProfileView } from "@/components/profile/view";
import { useUserInventory } from "@/hooks/use-user-inventory";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { inventories, sort, filter, fetchNextPage, isOwner } =
    useUserInventory(params?.id);

  return (
    <ProfileView
      isOwner={isOwner}
      data={inventories || []}
      defaultFilter="anyone"
      onFilterChange={filter}
      onSortChange={sort}
      loadMore={() => fetchNextPage()}
    />
  );
}
