"use client";
import { Button, Flex } from "@radix-ui/themes";
import { signIn } from "next-auth/react";

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
        <img src="/google-logo.svg" height={"20"} width={"20"} />
        Sign In with Google
      </Button>
      <Button onClick={() => signIn("facebook")} variant="outline">
        <img src="/facebook-logo.svg" height={"20"} width={"20"} />
        Sign In with Facebook
      </Button>
    </Flex>
  );
}
