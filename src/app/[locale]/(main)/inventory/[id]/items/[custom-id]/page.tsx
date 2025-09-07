"use client";
import { useSaveWithStatus } from "@/components/auto-save/provider";
import { InventoryItemsItemView } from "@/components/inventory/items/item-view";
import { Loader } from "@/components/loader";
import { useInventoryItem } from "@/hooks/use-inventory-item";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ "custom-id": string }>();
  const { data } = useSession();
  const { item, isLoading, update, like, liked, likes, fields } =
    useInventoryItem({
      customId: params ? decodeURIComponent(params["custom-id"]) : undefined,
      user: data?.user,
    });

  const handleSave = useSaveWithStatus(update);
  const handleLike = useSaveWithStatus(like);

  if (isLoading) {
    return <Loader />;
  }

  if (!item) {
    notFound();
  }

  return (
    <InventoryItemsItemView
      item={item}
      likes={likes || 0}
      liked={liked}
      owner={item.owner}
      fields={fields?.sort((a, b) => a.orderIndex - b.orderIndex) || []}
      onSave={handleSave}
      onLike={handleLike}
    />
  );
}
