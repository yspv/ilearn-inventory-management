"use client";
import React from "react";
import { Button, Flex, Popover, TextField, Tooltip } from "@radix-ui/themes";
import { Component2Icon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { EmojiPicker } from "@/components/emoji-picker";
import { useTranslations } from "next-intl";

export type CustomIdFieldProps = {
  type: string;
  format: string;
  onChange(e: string): void;
};

const fields: Record<string, any> = {
  fixed: {
    placeholder: "ITEM-",
  },
  datetime: {
    placeholder: "[YYYY/MM/DD]_",
  },
  guid: {
    placeholder: "[G]",
  },
  bit32: {
    placeholder: "[X:5]",
  },
  bit20: {
    plaecholder: "[X:7]",
  },
  digit6: {
    placeholder: "",
  },
  digit9: {
    placeholder: "",
  },
  sequence: {
    placeholder: "[D:5]",
  },
};

function EmojiPickerPopover(props: { onSelect(emoji: string): void }) {
  const { onSelect } = props;
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="ghost" color="gray">
          <Component2Icon />
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <EmojiPicker onEmojiSelect={(e) => onSelect(e.emoji)} />
      </Popover.Content>
    </Popover.Root>
  );
}

export function CustomIdField(props: CustomIdFieldProps) {
  const { type, format, onChange } = props;
  const t = useTranslations("inventory.custom-id.tooltips");
  const field = fields[type];
  return (
    <Flex direction="column" width="100%">
      <TextField.Root
        value={format}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        size="3"
      >
        <TextField.Slot>
          <Tooltip content={t(type)}>
            <QuestionMarkCircledIcon />
          </Tooltip>
        </TextField.Slot>
        {type === "fixed" && (
          <TextField.Slot>
            <EmojiPickerPopover
              onSelect={(emoji) => onChange(format + emoji)}
            />
          </TextField.Slot>
        )}
      </TextField.Root>
    </Flex>
  );
}
