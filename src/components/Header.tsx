"use client";
import { Box, Button, Card, Flex } from "@radix-ui/themes";
import { signOut } from "next-auth/react";

export default function Header() {
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <Box position="sticky" top="0" style={{ zIndex: 10 }}>
      <Flex justify={"between"} direction="column" align={"center"} py="4">
        <Button onClick={handleSignOut}>Logout</Button>
      </Flex>
    </Box>
  );
}
