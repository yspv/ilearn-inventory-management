"use client";
import { User } from "@prisma/client";
import { Avatar, Button, Flex } from "@radix-ui/themes";

import dynamic from "next/dynamic";
import React from "react";

const Editor = dynamic(
  () => import("@/components/markdown").then((mod) => mod.BasicMarkdownEditor),
  { ssr: false },
);

interface Props {
  user: User;
  onComment(comment: string): void;
}

export function InventoryDiscussionCommentForm(props: Props) {
  const { user, onComment } = props;
  const [comment, setCommment] = React.useState("");
  function handleComment() {
    onComment(comment);
    setCommment("");
  }
  return (
    <Flex direction="column" gap="4">
      <Flex gap="4">
        <Avatar
          mt="2"
          size="2"
          src={user.image || undefined}
          fallback="A"
          radius="full"
        />
        <Flex
          direction="column"
          width="100%"
          style={{ borderBottom: "1px solid var(--gray-3)" }}
        >
          <Editor markdown={comment} onChange={setCommment} />
        </Flex>
      </Flex>
      <Flex justify="end">
        <Button disabled={!comment} onClick={handleComment}>
          Comment
        </Button>
      </Flex>
    </Flex>
  );
}
