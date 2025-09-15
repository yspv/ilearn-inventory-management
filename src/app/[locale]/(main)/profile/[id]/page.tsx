"use client";
import { useParams } from "next/navigation";
import React from "react";
import { ProfileView } from "@/components/profile/view";
import { useUserInventory } from "@/hooks/use-user-inventory";
import { trpc } from "@/lib/trpc";
import { useErrorToaster } from "@/hooks/use-error-toaster";

export default function Page() {
  const params = useParams<{ id: string }>();
  const errorToast = useErrorToaster();

  const { inventories, sort, filter, fetchNextPage, isOwner } =
    useUserInventory(params?.id);

  const { mutate: salesforceCreate } = trpc.salesforce.create.useMutation({
    onError: ({ data }) => errorToast(data?.code),
  });

  return (
    <ProfileView
      isOwner={isOwner}
      data={inventories || []}
      defaultFilter="anyone"
      onFilterChange={filter}
      onSortChange={sort}
      loadMore={() => fetchNextPage()}
      onSalesforce={salesforceCreate}
    />
  );
}
