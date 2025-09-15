"use client";
import { useTranslations } from "next-intl";
import {
  ProfileInventoryTable,
  Props as ProfileInventoryProps,
} from "./inventory-table";
import { Box, Button, Container, Flex, Section } from "@radix-ui/themes";
import { Link } from "@/i18n/navigation";
import { SalesforceDialog } from "./salesforce-dialog";

interface Props extends ProfileInventoryProps {
  onSalesforce(data: any): void;
}

export function ProfileView(props: Props) {
  const { isOwner, onSalesforce } = props;
  const label = useTranslations("labels");
  return (
    <Box>
      <Section>
        <Container size="3" px={{ initial: "4", lg: "0" }}>
          <Flex justify={"end"} mb="4" gap="4">
            {isOwner && (
              <>
                <SalesforceDialog onSubmit={onSalesforce} />
                <Link href="/inventory/create">
                  <Button>{label("create")}</Button>
                </Link>
              </>
            )}
          </Flex>
          <ProfileInventoryTable {...props} />
        </Container>
      </Section>
    </Box>
  );
}
