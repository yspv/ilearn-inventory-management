"use client";
import { Button, Flex } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import Image from "next/image";

export function AuthOptions() {
  return (
    <Flex
      align="stretch"
      direction="column"
      justify="between"
      flexGrow="1"
      gap="4"
    >
      <Button onClick={() => signIn("google")} variant="outline">
        <Image
          src="/google-logo.svg"
          height={"20"}
          width={"20"}
          alt="google-logo"
        />
        Sign In with Google
      </Button>
      <Button onClick={() => signIn("facebook")} variant="outline">
        <Image
          src="/facebook-logo.svg"
          height={"20"}
          width={"20"}
          alt="facebook-logo"
        />
        Sign In with Facebook
      </Button>
    </Flex>
  );
}
