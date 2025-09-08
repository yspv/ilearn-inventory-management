"use client";
import { CategoryCombobox } from "@/components/category-combobox";
import { TagsCombobox } from "@/components/tags-combobox";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Container,
  Flex,
  Grid,
  Text,
  TextField,
} from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";
import { InventoryCreateSchema as schema, InventoryCreateType } from "./schema";
import { useTranslations } from "next-intl";

const MarkdownEditor = dynamic(() => import("@/components/markdown"), {
  ssr: false,
});

interface Props {
  onSave(data: InventoryCreateType): void;
}

export function InventoryCreateView(props: Props) {
  const { onSave } = props;
  const t = useTranslations("inventory.settings");
  const labels = useTranslations("labels");
  const { handleSubmit, control } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tags: [],
      isPrivate: true,
    },
    resolver: zodResolver(schema),
  });
  return (
    <form onSubmit={handleSubmit(onSave)}>
      <Container p={{ initial: "4", lg: "0" }}>
        <Grid columns={{ initial: "1", lg: "3" }}>
          <Flex direction="column" gap="4">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Text as="label" size="2">
                  <Flex direction="column" gap="2">
                    {t("title")}
                    <TextField.Root
                      size="3"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </Flex>
                </Text>
              )}
            />
            <Controller
              name="isPrivate"
              control={control}
              render={({ field }) => (
                <Text as="label" size="2">
                  <Flex gap="2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    {t("private")}
                  </Flex>
                </Text>
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Text as="label" size="2">
                  <Flex direction="column" gap="2">
                    {t("category")}
                    <CategoryCombobox
                      onChange={({ name }) => {
                        field.onChange(name);
                      }}
                    />
                  </Flex>
                </Text>
              )}
            />
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Text as="label" size="2">
                  <Flex direction="column" gap="2">
                    {t("tags")}
                    <TagsCombobox
                      onChange={(tags) => {
                        field.onChange(tags.map((t) => t.name));
                      }}
                    />
                  </Flex>
                </Text>
              )}
            />
          </Flex>
        </Grid>
        <Flex direction="column" mt="6">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Text size="2">
                <Flex direction="column" gap="2">
                  {t("description")}
                  <MarkdownEditor
                    markdown={field.value}
                    onChange={field.onChange}
                  />
                </Flex>
              </Text>
            )}
          />
        </Flex>
        <Flex width={{ initial: "100%", lg: "fit-content" }} mt="6">
          <Button style={{ width: "100%" }}>{labels("save")}</Button>
        </Flex>
      </Container>
    </form>
  );
}
