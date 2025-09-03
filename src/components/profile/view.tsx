"use client";
import {
  ProfileInventoryTable,
  Props as ProfileInventoryProps,
} from "./inventory-table";
import { Box, Container, Section } from "@radix-ui/themes";

export function ProfileView(props: ProfileInventoryProps) {
  return (
    <Box>
      <Section>
        <Container size="3">
          <ProfileInventoryTable {...props} />
        </Container>
      </Section>
    </Box>
  );
}
