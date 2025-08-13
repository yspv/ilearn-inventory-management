"use client";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { EmojiPicker as Emoji, EmojiPickerRootProps } from "frimousse";

export function EmojiPicker(props: EmojiPickerRootProps) {
  return (
    <Emoji.Root
      {...props}
      style={{
        height: "342px",
        width: "100%",
        backgroundColor: "var(--gray-2)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Emoji.Search
        style={{
          height: "var(--space-6)",
          padding: "var(--space-2)",
          borderRadius: "var(--radius-3)",
          outline: "none",
          border: 0,
          backgroundColor: "var(--gray-3)",
        }}
      />
      <Emoji.Viewport style={{ flex: 1, position: "relative" }}>
        <Emoji.Empty>No result found</Emoji.Empty>
        <Emoji.Loading>Loading</Emoji.Loading>
        <Emoji.List
          components={{
            CategoryHeader: ({ category, ...props }) => (
              <Box
                {...props}
                pb="2"
                pt="3"
                top="0"
                style={{ background: "var(--gray-2)", position: "sticky" }}
              >
                <Text size="1">{category.label}</Text>
              </Box>
            ),
            Row: ({ children, ...props }) => (
              <Flex justify="between" align="center" {...props}>
                {children}
              </Flex>
            ),
            Emoji: ({ emoji, ...props }) => (
              <Button
                {...props}
                size="2"
                color="gray"
                variant="ghost"
                data-slot="emoji-picker-emoji"
              >
                {emoji.emoji}
              </Button>
            ),
          }}
          data-slot="emoji-picker-list"
        />
      </Emoji.Viewport>
    </Emoji.Root>
  );
}
