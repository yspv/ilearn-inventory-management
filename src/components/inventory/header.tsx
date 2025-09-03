"use client";

import { Flex, Heading } from "@radix-ui/themes";
import { AutoSaveStatus } from "../auto-save/status";
import { useInventory } from "./provider";

export default function InventoryHeader() {
  const { inventory } = useInventory();
  return (
    <Flex align="center" gap="4">
      <Heading>{inventory.title}</Heading>
      <AutoSaveStatus />
    </Flex>
  );
}
