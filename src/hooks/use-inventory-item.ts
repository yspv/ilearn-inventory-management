import { InventoryItem, InventoryItemLike, User } from "@prisma/client";
import { useErrorToaster } from "./use-error-toaster";
import { useInventory } from "@/components/inventory/provider";
import { trpc } from "@/lib/trpc";
import { useTranslations } from "next-intl";

type InventoryItemWithRelation = InventoryItem & {
  owner: User;
  _count: { likes: number };
  likes: InventoryItemLike[];
};

function buildArgs(inventoryId: string, customId: string, userId?: string) {
  return {
    where: {
      inventoryId_customId: {
        customId,
        inventoryId,
      },
    },
    include: {
      owner: true,
      likes: userId ? { where: { userId } } : undefined,
      _count: { select: { likes: true } },
    },
  };
}

function getUpdatedLikeState(isLiked: boolean, count: number, user?: User) {
  return {
    likes: isLiked ? [user] : [],
    _count: { likes: isLiked ? count + 1 : count - 1 },
  };
}

export function useInventoryItem(props: { customId?: string; user?: User }) {
  const { customId, user } = props;
  const t = useTranslations("labels");
  const trpcUtils = trpc.useUtils();
  const { inventory, refetch } = useInventory();
  const errorToaster = useErrorToaster({
    CONFLICT: { label: t("reload"), action: refetch },
  });

  const args = buildArgs(inventory.id, customId!, user?.id);

  const {
    data: item,
    isLoading,
    isFetching,
  } = trpc.inventoryItem.findUnique.useQuery<InventoryItemWithRelation>(args, {
    enabled: !!customId,
  });

  const { data: fields } = trpc.inventoryField.findManyByInventoryId.useQuery({
    id: inventory.id,
  });

  function handleUpdateSuccess(data: InventoryItem) {
    trpcUtils.inventoryItem.findUnique.setData(args, (prev) => ({
      ...prev!,
      version: data.version,
    }));
  }

  function handleLikeSuccess(data: { liked: boolean }) {
    if (!item) return;
    const likeState = getUpdatedLikeState(data.liked, item._count.likes, user);
    trpcUtils.inventoryItem.findUnique.setData(args, (prev) =>
      prev ? { ...prev, ...likeState } : prev,
    );
  }

  const { mutateAsync: itemUpdateMutate } =
    trpc.inventoryItem.update.useMutation({
      onSuccess: handleUpdateSuccess,
      onError: ({ data }) => errorToaster(data?.code),
    });

  const { mutateAsync: likeMutate } = trpc.inventoryItemLike.like.useMutation({
    onSuccess: handleLikeSuccess,
    onError: ({ data }) => errorToaster(data?.code),
  });

  async function handleItemUpdate(data: any) {
    if (!item || !fields) return;
    return itemUpdateMutate({
      id: item.id,
      version: item.version,
      inventoryVersion: fields.version,
      data,
    });
  }

  async function handleLike() {
    if (!item) return;
    return likeMutate({
      id: item.id,
    });
  }

  return {
    item,
    isLoading: isFetching || isLoading,
    likes: item?._count.likes || 0,
    liked: !!item?.likes.length,
    fields: fields?.fields,
    update: handleItemUpdate,
    like: handleLike,
  };
}
