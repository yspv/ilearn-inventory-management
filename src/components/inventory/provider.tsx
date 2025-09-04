"use client";
import { trpc } from "@/lib/trpc";
import { Inventory } from "@prisma/client";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import React from "react";

type InventoryContextType = {
  inventory: Inventory;
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
    refetch,
  } = trpc.inventory.findUnique.useQuery({
    where: { id },
  });

  function update(data: any) {
    trpcUtils.inventory.findUnique.setData({ where: { id } }, data);
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!inventory) {
    notFound();
  }

  return (
    <InventoryContext.Provider
      value={{
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
