import { Button, Dialog, Flex } from "@radix-ui/themes";
import React from "react";
import { InventoryFieldForm } from "./form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";

interface Props {
  field: any;
  onUpdate(data: any): void;
}

export function InventoryFieldDialogUpdate(props: Props) {
  const { field, onUpdate } = props;
  const { control, handleSubmit, formState } = useForm({
    defaultValues: field,
    resolver: zodResolver(schema),
  });
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          size="3"
          color="gray"
          variant="soft"
          highContrast
          style={{ width: "100%" }}
        >
          {field.title}
        </Button>
      </Dialog.Trigger>
      <Dialog.Content
        maxWidth={{ initial: "100%", lg: "30rem" }}
        aria-describedby={undefined}
      >
        <form onSubmit={handleSubmit(onUpdate)}>
          <Flex direction="column">
            <Dialog.Title>Update field</Dialog.Title>
            <InventoryFieldForm control={control} />
            <Dialog.Close disabled={!formState.isValid}>
              <Button type="submit" mt="4">
                Save
              </Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
