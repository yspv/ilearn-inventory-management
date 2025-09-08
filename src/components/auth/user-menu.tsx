"use client";
import { ExitIcon } from "@radix-ui/react-icons";
import { Avatar, Flex, Popover, Text, Button } from "@radix-ui/themes";
import { signOut, useSession } from "next-auth/react";
import { SignInButton } from "./signin-button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function UserMenu() {
  const t = useTranslations("sign-in");
  const { status, data } = useSession();

  const handleSignOut = async () => {
    await signOut();
  };

  if (status !== "authenticated") {
    return <SignInButton />;
  }

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Flex gap="2" style={{ cursor: "var(--cursor-button)" }}>
          <Avatar
            size="2"
            src={data?.user.image || undefined}
            fallback="A"
            radius="full"
          />
        </Flex>
      </Popover.Trigger>
      <Popover.Content width="20rem" align="end">
        <Flex direction="column" justify="center" align="center" gap="4">
          <Text weight="medium">{data?.user.email}</Text>
          <Avatar
            src={data.user?.image || undefined}
            fallback="A"
            size="6"
            radius="full"
          />
          <Text size="5">{t("hello", { name: data?.user.name || "" })} </Text>
          <Popover.Close>
            <Link
              href={`/profile/${data.user.id}`}
              passHref
              style={{ width: "100%" }}
            >
              <Button
                color="gray"
                variant="soft"
                highContrast
                style={{ width: "100%" }}
              >
                Profile
              </Button>
            </Link>
          </Popover.Close>
          <Button onClick={handleSignOut} style={{ width: "100%" }}>
            <ExitIcon />
            {t("sign-out")}
          </Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
