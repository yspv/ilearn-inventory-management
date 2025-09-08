"use client";
import { useAutoSave } from "@/components/auto-save/provider";
import { CategoryCombobox } from "@/components/category-combobox";
import { TagsCombobox } from "@/components/tags-combobox";
import { Category, Inventory, Tag } from "@prisma/client";
import { Flex, Text, Grid, TextField, Checkbox } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import React from "react";

const MarkdownEditor = dynamic(() => import("@/components/markdown"), {
  ssr: false,
});

export interface InventorySettingsProps {
  inventory: Inventory;
  tags: Tag[];
  category?: Category;
  onUpdate(data: {
    title: string;
    description: string;
    isPrivate: boolean;
    tags?: { name: string }[];
    category?: { name: string };
  }): Promise<unknown>;
}

export function InventorySettingsView(props: InventorySettingsProps) {
  const { inventory, tags, category, onUpdate } = props;
  const t = useTranslations("inventory.settings");
  const [data, setData] = React.useState(inventory);

  async function handleUpdate() {
    await onUpdate(data);
  }

  useAutoSave(data, handleUpdate, 5000);

  return (
    <Flex direction="column" gap="4">
      <Grid columns={{ initial: "1", lg: "3" }}>
        <Flex direction="column" gap="4">
          <Text as="label" size="2">
            <Flex direction="column" gap="2">
              {t("title")}
              <TextField.Root
                value={data.title}
                size="3"
                onChange={(e) =>
                  setData((p) => ({ ...p, title: e.target.value }))
                }
              />
            </Flex>
          </Text>
          <Text as="label" size="2">
            <Flex gap="2">
              <Checkbox
                checked={data.isPrivate}
                onCheckedChange={(state) =>
                  setData((p) => ({ ...p, isPrivate: state as boolean }))
                }
              />
              {t("private")}
            </Flex>
          </Text>
          <Text as="label" size="2">
            <Flex direction="column" gap="2">
              {t("category")}
              <CategoryCombobox
                initial={category}
                onChange={(category) => {
                  setData((p) => ({ ...p, category }));
                }}
              />
            </Flex>
          </Text>
          <Text size="2">
            <Flex direction="column" gap="2">
              {t("tags")}
              <TagsCombobox
                initial={tags}
                onChange={(tags) => setData((prev) => ({ ...prev, tags }))}
              />
            </Flex>
          </Text>
        </Flex>
      </Grid>
      <Text size="2">
        <Flex direction="column" gap="2">
          {t("description")}
          <MarkdownEditor
            markdown={data.description}
            onChange={(description) => setData((p) => ({ ...p, description }))}
          />
        </Flex>
      </Text>
    </Flex>
  );
}
