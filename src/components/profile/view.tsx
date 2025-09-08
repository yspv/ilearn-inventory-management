"use client";
import { useTranslations } from "next-intl";
import {
  ProfileInventoryTable,
  Props as ProfileInventoryProps,
} from "./inventory-table";
import { Box, Button, Container, Flex, Section } from "@radix-ui/themes";
import { Link } from "@/i18n/navigation";

export function ProfileView(props: ProfileInventoryProps) {
  const { isOwner } = props;
  const label = useTranslations("labels");
  return (
    <Box>
      <Section>
        <Container size="3" px={{ initial: "4", lg: "0" }}>
          <Flex justify={"end"} mb="4">
            {isOwner && (
              <Link href="/inventory/create">
                <Button>{label("create")}</Button>
              </Link>
            )}
          </Flex>
          <ProfileInventoryTable {...props} />
        </Container>
      </Section>
    </Box>
  );
}
