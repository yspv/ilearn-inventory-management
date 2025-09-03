import { Button, Dialog, Flex } from "@radix-ui/themes";
import React from "react";
import { InventoryFieldForm } from "./form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";

interface Props {
  onAdd(data: any): void;
}

export function InventoryFieldDialogAdd(props: Props) {
  const { onAdd } = props;
  const { handleSubmit, control, formState } = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: "string",
      required: true,
      isVisible: true,
    },
    resolver: zodResolver(schema),
  });
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="3">Add Element</Button>
      </Dialog.Trigger>
      <Dialog.Content
        maxWidth={{ initial: "100%", lg: "30rem" }}
        aria-describedby={undefined}
      >
        <form onSubmit={handleSubmit(onAdd)}>
          <Flex direction="column">
            <Dialog.Title>Add new custom field</Dialog.Title>
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
