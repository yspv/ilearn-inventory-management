"use client";
import { EmojiPicker } from "@/components/emoji-picker";
import { Component2Icon } from "@radix-ui/react-icons";
import { Button, Popover, TextField } from "@radix-ui/themes";
import { CustomIdFieldProps } from "./custom-id-field";

export function CustomIdFixedField(props: CustomIdFieldProps) {
  const { format, onChange } = props;
  return (
    <TextField.Root
      size="3"
      placeholder="ITEM-"
      value={format}
      onChange={(e) => onChange(e.target.value)}
    >
      <TextField.Slot>
        <Popover.Root>
          <Popover.Trigger>
            <Button variant="ghost" color="gray">
              <Component2Icon />
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <EmojiPicker onEmojiSelect={(e) => onChange(format + e.emoji)} />
          </Popover.Content>
        </Popover.Root>
      </TextField.Slot>
    </TextField.Root>
  );
}
