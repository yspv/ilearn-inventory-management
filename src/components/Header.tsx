"use client";
import { Link } from "@/i18n/navigation";
import { ExitIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Popover,
  Text,
  TextField,
} from "@radix-ui/themes";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { ThemeChanger } from "./theme-changer";
import { LanguageSelect } from "./language-select";
import { Logo } from "./logo";

function UserPopover(props: { user: User; onLogOut(): void }) {
  const { user, onLogOut } = props;

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Flex gap="2" style={{ cursor: "var(--cursor-button)" }}>
          <Avatar
            size="2"
            src={user.image || undefined}
            fallback="A"
            radius="full"
          />
        </Flex>
      </Popover.Trigger>
      <Popover.Content width="20rem" align="end">
        <Flex direction="column" justify="center" align="center" gap="4">
          <Text weight="medium">{user?.email}</Text>
          <Avatar
            src={user?.image || undefined}
            fallback="A"
            size="6"
            radius="full"
          />
          <Text size="5"> Hi, {user?.name}</Text>
          <Button onClick={onLogOut} style={{ width: "100%" }}>
            <ExitIcon />
            Logout
          </Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}

function SignInButton() {
  return (
    <Link href="/signin" passHref>
      <Button>Log In</Button>
    </Link>
  );
}

function Search() {
  return (
    <TextField.Root
      radius="full"
      size="3"
      style={{ width: "100%" }}
      placeholder="Search"
    >
      <TextField.Slot>
        <MagnifyingGlassIcon />
      </TextField.Slot>
    </TextField.Root>
  );
}

export function Header() {
  const { data } = useSession();
  const user = data?.user;
  const handleSignOut = async () => {
    await signOut();
  };
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
        <Flex flexBasis="60%">{/*<Search />*/}</Flex>
        <Flex justify="end" align="center" flexBasis="20%" gap="4">
          <LanguageSelect />
          <ThemeChanger />
          {user ? (
            <UserPopover user={user} onLogOut={handleSignOut} />
          ) : (
            <SignInButton />
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
