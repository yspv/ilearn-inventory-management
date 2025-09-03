import { AutoSaveProvider } from "@/components/auto-save/provider";
import InventoryHeader from "@/components/inventory/header";
import { InventoryProvider } from "@/components/inventory/provider";
import InventoryTabs from "@/components/inventory/tabs";
import { Box, Container, Flex } from "@radix-ui/themes";
import React from "react";

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { children, params } = props;
  const { id } = await params;
  return (
    <AutoSaveProvider>
      <InventoryProvider id={id}>
        <Container>
          <Flex direction="column" gap="4" px={{ initial: "4", lg: "0" }}>
            <InventoryHeader />
            <InventoryTabs />
            <Box>{children}</Box>
          </Flex>
        </Container>
      </InventoryProvider>
    </AutoSaveProvider>
  );
}
