import InventoryTabs from "@/components/inventory/tabs";
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import React from "react";

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <Container>
      <Flex direction="column" gap="4">
        <Heading>Inventory</Heading>
        <InventoryTabs />
        <Box>{children}</Box>
      </Flex>
    </Container>
  );
}
