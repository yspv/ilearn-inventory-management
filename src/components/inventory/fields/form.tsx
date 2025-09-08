"use client";
import { Checkbox, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import { InventoryFieldSelect } from "./field-select";
import { Control, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

export function InventoryFieldForm(props: { control: Control<any> }) {
  const { control } = props;
  const t = useTranslations("inventory.fields");
  return (
    <Flex direction="column" gap="4">
      <Controller
        name="type"
        control={control}
        render={({ field, fieldState }) => (
          <Flex direction="column" gap="2">
            <Text weight="medium" size="2">
              {t("type")}
            </Text>
            <InventoryFieldSelect
              type={field.value}
              onChange={(type) => field.onChange(type)}
            />
            {fieldState.invalid && <Text>{fieldState.error?.message}</Text>}
          </Flex>
        )}
      />
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState }) => (
          <Flex direction="column" gap="2">
            <Text weight="medium" size="2">
              {t("title")}
            </Text>
            <TextField.Root
              size="3"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />

            {fieldState.invalid && (
              <Text color="red" size="2">
                {fieldState.error?.message}
              </Text>
            )}
          </Flex>
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <Flex direction="column" gap="2">
            <Text weight="medium" size="2">
              {t("description")}
            </Text>
            <TextArea
              size="3"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
            {fieldState.invalid && (
              <Text color="red" size="2">
                {fieldState.error?.message}
              </Text>
            )}
          </Flex>
        )}
      />
      <Controller
        name="required"
        control={control}
        render={({ field }) => (
          <Text as="label" size="2">
            <Flex gap="2">
              <Checkbox
                checked={field.value}
                onCheckedChange={(state) => field.onChange(state)}
              />
              {t("required")}
            </Flex>
          </Text>
        )}
      />
      <Controller
        name="isVisible"
        control={control}
        render={({ field }) => (
          <Text as="label" size="2">
            <Flex gap="2">
              <Checkbox
                checked={field.value}
                onCheckedChange={(state) => field.onChange(state)}
              />
              {t("visible")}
            </Flex>
          </Text>
        )}
      />
    </Flex>
  );
}
