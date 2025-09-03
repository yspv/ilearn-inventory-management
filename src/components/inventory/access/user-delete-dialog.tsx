"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

export function InventoryAccessUserDelete(props: { onAction(): void }) {
  const { onAction } = props;
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="surface">
          Delete
          <TrashIcon />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content width={{ initial: "100%", lg: "30%" }}>
        <AlertDialog.Title>Delete User(s)?</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? Selected users and their field will delete
        </AlertDialog.Description>
        <Flex justify="end" gap="4" mt="4">
          <AlertDialog.Cancel>
            <Button variant="outline">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={onAction}>Delete</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
