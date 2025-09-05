"use client";
import { useAutoSave } from "@/components/auto-save/provider";
import { InventoryAccessView } from "@/components/inventory/access/view";
import { useInventory } from "@/components/inventory/provider";
import { Loader } from "@/components/loader";
import { trpc } from "@/lib/trpc";
import { AppRouterInput } from "@/trpc/router/_app";
import { UserHit } from "@/types/typesense";
import React from "react";

export default function Page() {
  const { inventory } = useInventory();
  const [changes, setChanges] = React.useState<Record<string, any>>({});

  const trpcUtils = trpc.useUtils();

  const [input, setInput] = React.useState<AppRouterInput["user"]["findMany"]>({
    take: 50,
    where: { inventories: { some: { inventoryId: inventory.id } } },
  });

  const { data, isLoading, refetch, fetchNextPage } =
    trpc.user.findMany.useInfiniteQuery(input, {
      getNextPageParam: (prev) => prev.nextCursor,
    });

  const { mutateAsync } = trpc.inventory.update.useMutation({
    onSuccess: () => {
      setInput((prev) => ({ ...prev, cursor: undefined }));
      trpcUtils.user.findMany.invalidate();
    },
  });

  function handleSort(state: Record<string, string>) {
    setInput((p) => ({ ...p, orderBy: state, cursor: undefined }));
    refetch();
  }

  function buildDeleteMembers(ids?: string[]) {
    if (!ids) return;
    return {
      deleteMany: {
        userId: { in: ids },
      },
    };
  }

  function buildAddMembers(users?: UserHit[]) {
    if (!users) return;
    return {
      createMany: {
        data: users.map(({ id }) => ({ userId: id })),
      },
    };
  }

  async function handleChanges() {
    const data = {
      members: {
        ...buildAddMembers(changes.add),
        ...buildDeleteMembers(changes.delete),
      },
    };

    return mutateAsync({
      where: { id: inventory.id },
      data,
    });
  }

  useAutoSave(changes, handleChanges, 5000);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <InventoryAccessView
      data={data?.pages.flatMap((p) => p.items) || []}
      onSortChange={handleSort}
      onLoadMore={fetchNextPage}
      onAddUsers={(users) => setChanges((prev) => ({ ...prev, add: users }))}
      onDeleteUsers={(users) => {
        setChanges((prev) => ({ ...prev, delete: users }));
      }}
    />
  );
}
