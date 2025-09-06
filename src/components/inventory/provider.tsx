"use client";
import { trpc } from "@/lib/trpc";
import { Category, Inventory, Tag } from "@prisma/client";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import React from "react";
import { Loader } from "../loader";

type InventoryContextType = {
  inventory: Inventory;
  category: Category;
  tags: Tag[];
  isOwner: boolean;
  isAdmin: boolean;
  refetch(): void;
  update(data: any): void;
};
const InventoryContext = React.createContext<InventoryContextType | null>(null);

export function InventoryProvider(
  props: React.PropsWithChildren<{ id: string }>,
) {
  const { children, id } = props;
  const { data } = useSession();
  const trpcUtils = trpc.useUtils();

  const {
    data: inventory,
    isLoading,
    isFetching,
    refetch,
  } = trpc.inventory.findUnique.useQuery<
    Inventory & { tags: Tag[]; category: Category }
  >({
    where: { id },
    include: { tags: true, category: true },
  });

  function update(data: any) {
    trpcUtils.inventory.findUnique.setData({ where: { id } }, data);
  }

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (!inventory) {
    notFound();
  }

  return (
    <InventoryContext.Provider
      value={{
        tags: inventory.tags,
        category: inventory.category,
        refetch,
        inventory,
        update,
        isAdmin: !!data?.user.isAdmin,
        isOwner: data?.user.id === inventory.ownerId,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = React.useContext(InventoryContext);
  if (!context) {
    throw Error("useMyContext must be used within a InventoryProvider");
  }
  return context;
}
