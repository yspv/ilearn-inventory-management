"use client";
import { Button, Flex } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function AuthOptions() {
  const t = useTranslations("sign-in");
  return (
    <Flex
      align="stretch"
      direction="column"
      justify="between"
      flexGrow="1"
      gap="4"
    >
      <Button
        onClick={() => signIn("google", { redirectTo: "/" })}
        variant="outline"
      >
        <Image
          src="/google-logo.svg"
          height={"20"}
          width={"20"}
          alt="google-logo"
        />
        {t("option", { provider: "Google" })}
      </Button>
      <Button onClick={() => signIn("facebook")} variant="outline">
        <Image
          src="/facebook-logo.svg"
          height={"20"}
          width={"20"}
          alt="facebook-logo"
        />
        {t("option", { provider: "Facebook" })}
      </Button>
    </Flex>
  );
}
