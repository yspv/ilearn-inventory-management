"use client";
import { Flex, Select } from "@radix-ui/themes";
import { useTranslations } from "next-intl";

const fields = [
  {
    type: "string",
  },
  {
    type: "mlText",
  },
  {
    type: "boolean",
  },
  {
    type: "link",
  },
  {
    type: "num",
  },
];

export function InventoryFieldSelect(props: {
  type: string;
  onChange(type: string): void;
}) {
  const { type, onChange } = props;
  const t = useTranslations("inventory.fields.types");
  return (
    <Flex direction="column" style={{ width: "100%" }}>
      <Select.Root
        value={type}
        size="3"
        onValueChange={(type) => onChange(type)}
      >
        <Select.Trigger />
        <Select.Content position="popper">
          <Select.Group>
            {fields.map((field, i) => (
              <Select.Item key={i} value={field.type}>
                {t(field.type)}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
}
