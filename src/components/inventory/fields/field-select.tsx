"use client";
import { Flex, Select } from "@radix-ui/themes";

export function InventoryFieldSelect(props: {
  type: string;
  onChange(type: string): void;
}) {
  const { type, onChange } = props;
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
                {field.type}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
}
