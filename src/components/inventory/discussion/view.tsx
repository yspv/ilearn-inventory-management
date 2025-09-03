"use client";
import { InventoryComment, User } from "@prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { InventoryDiscussionItem } from "./discussion-item";
import React from "react";
import { InventoryDiscussionCommentForm } from "./comment-form";
import { InfiniteScroll } from "@/components/infinite-scroll";

interface Props {
  user?: User;
  comments: (InventoryComment & { user: User })[];
  onComment(comment: string): void;
  onLoadMore(): void;
}

export function InventoryDiscussionView(props: Props) {
  const { user, comments, onComment, onLoadMore } = props;
  return (
    <Grid columns={{ initial: "1", lg: "2" }}>
      <Flex direction="column">
        {user && (
          <InventoryDiscussionCommentForm user={user} onComment={onComment} />
        )}
        <InfiniteScroll loadMore={onLoadMore}>
          <Flex direction="column" gap="6">
            {comments.map((c, i) => (
              <InventoryDiscussionItem key={i} comment={c} user={c.user} />
            ))}
          </Flex>
        </InfiniteScroll>
      </Flex>
    </Grid>
  );
}
