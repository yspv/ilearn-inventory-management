"use client";
import { Card, Flex, Grid, Heading, Section, Text } from "@radix-ui/themes";
import { InventoryStatsNumericField } from "./numeric-field";
import { InventoryStatsStringField } from "./string-field";
import { useTranslations } from "next-intl";

interface Props {
  total: number;
  numerics: { field: string; max: number; min: number; avg: number }[];
  strings: { field: string; topValues: string[] }[];
}

export function InventoryStatsView(props: Props) {
  const { total, numerics, strings } = props;
  const t = useTranslations("inventory.stats");
  return (
    <Grid>
      <Section size="1">
        <Heading size="6">{t("statistics")}</Heading>
        <Grid columns={{ initial: "1", lg: "3" }} gap="4" mt="4">
          <Card size="4">
            <Flex
              direction="column"
              justify="center"
              align="center"
              gap="2"
              height="100%"
            >
              <Text color="gray">{t("total-items")}</Text>
              <Text size="6" weight="bold">
                {total}
              </Text>
            </Flex>
          </Card>
        </Grid>
      </Section>
      <Section size="1">
        <Heading size="4">{t("numeric-fields")}</Heading>
        <Grid columns={{ initial: "1", lg: "3" }} gap="4" mt="4">
          {numerics.map((f, i) => (
            <InventoryStatsNumericField key={i} {...f} />
          ))}
        </Grid>
      </Section>
      <Section size="1">
        <Heading size="4">{t("string-fields")}</Heading>
        <Grid columns={{ initial: "1", lg: "3" }} gap="6" mt="4">
          {strings.map((f, i) => (
            <InventoryStatsStringField key={i} {...f} />
          ))}
        </Grid>
      </Section>
    </Grid>
  );
}
