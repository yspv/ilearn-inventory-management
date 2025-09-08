"use client";
import { Box, Flex } from "@radix-ui/themes";
import { ThemeChanger } from "./theme-changer";
import { LanguageSelect } from "./language-select";
import { Logo } from "./logo";
import { UserMenu } from "./auth/user-menu";

export function Header() {
  return (
    <Box position="sticky" top="0" style={{ zIndex: 10 }}>
      <Flex
        justify={"center"}
        align={"center"}
        gap="6"
        py="4"
        px={{ initial: "4", lg: "6" }}
        style={{ background: "var(--color-background)" }}
      >
        <Flex flexBasis="20%">
          <Logo />
        </Flex>
        <Flex flexBasis="60%"></Flex>
        <Flex justify="end" align="center" flexBasis="20%" gap="4">
          <LanguageSelect />
          <ThemeChanger />
          <UserMenu />
        </Flex>
      </Flex>
    </Box>
  );
}
