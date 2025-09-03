import { trpc } from "@/lib/trpc";
import { AppRouterInput } from "@/trpc/router/_app";
import React from "react";

export function useUserInventory(userId?: string) {
  const [input, setInput] = React.useState<
    AppRouterInput["inventory"]["findMany"]
  >({
    take: 50,
    where: { OR: [{ ownerId: userId }, { members: { some: { userId } } }] },
    include: { owner: true },
  });

  const { data, refetch, fetchNextPage } =
    trpc.inventory.findMany.useInfiniteQuery<any>(input, {
      enabled: !!userId,
      getNextPageParam: (last) => last.nextCursor,
    });

  const ownerFilter: Record<string, any> = {
    me: {
      ownerId: userId,
    },
    notMe: {
      members: { some: { userId } },
    },
    anyone: {
      OR: [{ ownerId: userId }, { members: { some: { userId } } }],
    },
  };

  const filterHandler: Record<string, any> = {
    owner: (value: string) => {
      return ownerFilter[value];
    },
  };

  function sort(state: Record<string, string>) {
    setInput((prevState) => ({
      ...prevState,
      orderBy: state,
      cursor: undefined,
    }));
    refetch();
  }

  function filter(filters: { field: string; value: any }[]) {
    const query = filters.map((f) => filterHandler[f.field](f.value));
    setInput((prevState) => ({
      ...prevState,
      where: { AND: query },
      cursor: undefined,
    }));
    refetch();
  }

  return {
    inventories: data?.pages.flatMap((p: any) => p.items),
    sort,
    filter,
    fetchNextPage,
  };
}
