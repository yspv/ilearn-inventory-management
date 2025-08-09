"use client";
import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import React from "react";

export function SignInForm(props: {
  verifyAction: (state: any, formData: FormData) => void;
}) {
  const { verifyAction } = props;
  const [_, action, pending] = React.useActionState(verifyAction, undefined);
  return (
    <form action={action}>
      <Box mb="5">
        <Flex mb="1">
          <Text as="label" htmlFor="example-email-field" size="2" weight="bold">
            Email address
          </Text>
        </Flex>
        <TextField.Root
          placeholder="Enter your email"
          name="email"
          id="email"
          type="email"
        />
      </Box>
      <Flex direction="column">
        <Button loading={pending} type="submit">
          Continue
        </Button>
      </Flex>
    </form>
  );
}
