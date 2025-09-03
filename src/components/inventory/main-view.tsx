"use client";
import { Inventory } from "@prisma/client";
import { Container, Heading, Section } from "@radix-ui/themes";
import { InventoryTable } from "./inventory-table";

interface Props {
  top: Inventory[];
  latest: Inventory[];
}

export function InventoryMainView(props: Props) {
  const { top, latest } = props;
  return (
    <Container px={{ initial: "4", lg: "0" }}>
      <Section>
        <Heading size="4" mb="4">
          Latest Inventories
        </Heading>
        <InventoryTable data={latest} />
      </Section>
      <Section>
        <Heading size="4" mb="4">
          Top Inventories
        </Heading>
        <InventoryTable data={top} />
      </Section>
    </Container>
  );
}
