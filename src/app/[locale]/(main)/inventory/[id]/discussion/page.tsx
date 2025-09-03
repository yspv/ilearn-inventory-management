"use client";
import { useSaveWithStatus } from "@/components/auto-save/provider";
import { InventoryDiscussionView } from "@/components/inventory/discussion/view";
import { useInventory } from "@/components/inventory/provider";
import { trpc } from "@/lib/trpc";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data } = useSession();
  const { inventory } = useInventory();
  const { data: comments, fetchNextPage } =
    trpc.inventoryComment.findMany.useInfiniteQuery<any>(
      {
        take: 50,
        where: { inventoryId: inventory.id },
        orderBy: { createdAt: "asc" },
        include: { user: true },
      },
      {
        getNextPageParam: ({ nextCursor }) => nextCursor,
        refetchInterval: 5000,
      },
    );
  const { mutateAsync } = trpc.inventoryComment.create.useMutation();

  const handleComment = useSaveWithStatus(mutateAsync);

  return (
    <InventoryDiscussionView
      user={data?.user}
      comments={comments?.pages.flatMap((p: any) => p.items) || []}
      onComment={(comment) => {
        handleComment({ inventoryId: inventory.id, comment });
      }}
      onLoadMore={fetchNextPage}
    />
  );
}
