import { InventoryComment, User } from "@prisma/client";
import { Avatar, Flex, Text } from "@radix-ui/themes";
import Markdown from "react-markdown";

interface Props {
  user: User;
  comment: InventoryComment;
}

export function InventoryDiscussionItem(props: Props) {
  const { user, comment } = props;

  return (
    <Flex gap="4">
      <Avatar
        size="2"
        src={user.image || undefined}
        fallback="A"
        radius="full"
      />
      <Flex direction="column" gap="2">
        <Flex align="center" gap="2">
          <Text size="2" weight="bold">
            {user.name}
          </Text>
          <Text size="1" color="gray">
            {comment.createdAt.toLocaleDateString()}
          </Text>
        </Flex>
        <Markdown>{comment.comment}</Markdown>
      </Flex>
    </Flex>
  );
}
