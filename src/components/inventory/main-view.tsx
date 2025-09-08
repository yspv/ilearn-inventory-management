"use client";
import { Inventory } from "@prisma/client";
import { Container, Heading, Section } from "@radix-ui/themes";
import { InventoryTable } from "./inventory-table";
import { useTranslations } from "next-intl";

interface Props {
  top: Inventory[];
  latest: Inventory[];
}

export function InventoryMainView(props: Props) {
  const { top, latest } = props;
  const t = useTranslations("main");
  return (
    <Container px={{ initial: "4", lg: "0" }}>
      <Section>
        <Heading size="4" mb="4">
          {t("last-inventories")}
        </Heading>
        <InventoryTable data={latest} />
      </Section>
      <Section>
        <Heading size="4" mb="4">
          {t("top-inventories")}
        </Heading>
        <InventoryTable data={top} />
      </Section>
    </Container>
  );
}
