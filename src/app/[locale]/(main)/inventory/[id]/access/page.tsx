"use client";
import { useSaveWithStatus } from "@/components/auto-save/provider";
import { InventoryAccessView } from "@/components/inventory/access/view";
import { useInventory } from "@/components/inventory/provider";
import { Loader } from "@/components/loader";
import { useErrorToaster } from "@/hooks/use-error-toaster";
import { trpc } from "@/lib/trpc";
import { AppRouterInput } from "@/trpc/router/_app";
import { UserHit } from "@/types/typesense";
import React from "react";

export default function Page() {
  const { inventory, refetch } = useInventory();

  const errorToast = useErrorToaster();

  const trpcUtils = trpc.useUtils();

  const [input, setInput] = React.useState<AppRouterInput["user"]["findMany"]>({
    take: 50,
    where: { inventories: { some: { inventoryId: inventory.id } } },
  });

  const { data, isLoading, fetchNextPage } =
    trpc.user.findMany.useInfiniteQuery(input, {
      getNextPageParam: (prev) => prev.nextCursor,
    });

  const { mutateAsync: membersCreateMutate } =
    trpc.inventoryUser.createMany.useMutation({
      onSuccess: () => trpcUtils.user.findMany.invalidate(),
      onError: ({ data }) => errorToast(data?.code),
    });

  const { mutateAsync: membersDeleteMutate } =
    trpc.inventoryUser.deleteMany.useMutation({
      onSuccess: () => trpcUtils.user.findMany.invalidate(),
      onError: ({ data }) => errorToast(data?.code),
    });

  const handleAddMembers = useSaveWithStatus((users: UserHit[]) => {
    return membersCreateMutate({
      data: users.map((u) => ({ inventoryId: inventory.id, userId: u.id })),
      skipDuplicates: true,
    });
  });

  const handleDeleteMembers = useSaveWithStatus((usersIds: string[]) => {
    return membersDeleteMutate({
      where: { userId: { in: usersIds }, inventoryId: inventory.id },
    });
  });

  function handleSort(state: Record<string, string>) {
    setInput((p) => ({ ...p, orderBy: state, cursor: undefined }));
    refetch();
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <InventoryAccessView
      data={data?.pages.flatMap((p) => p.items) || []}
      onSortChange={handleSort}
      onLoadMore={fetchNextPage}
      onAddUsers={handleAddMembers}
      onDeleteUsers={handleDeleteMembers}
    />
  );
}
