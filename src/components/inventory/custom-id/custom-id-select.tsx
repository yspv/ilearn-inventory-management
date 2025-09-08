"use client";
import { Flex, Select } from "@radix-ui/themes";
import { useTranslations } from "next-intl";

const options = [
  {
    title: "Fixed",
    type: "fixed",
  },
  {
    title: "Date/time",
    type: "datetime",
  },
  {
    title: "32-bit random",
    type: "bit32",
  },
  {
    title: "20-bit random",
    type: "bit20",
  },
  {
    title: "6-digit random",
    type: "digit6",
  },
  {
    title: "9-digit",
    type: "digit9",
  },
  {
    title: "GUID",
    type: "guid",
  },
  {
    title: "Sequence",
    type: "sequence",
  },
];
export function CustomIdFieldSelect(props: {
  field: { type: string };
  onChange(type: string): void;
}) {
  const { field, onChange } = props;
  const t = useTranslations("inventory.custom-id.types");
  return (
    <Flex style={{ width: "100%" }}>
      <Select.Root
        onValueChange={(val) => onChange(val)}
        defaultValue={field.type}
        size="3"
      >
        <Select.Trigger style={{ width: "100%" }} />
        <Select.Content position="popper" className="dark">
          <Select.Group>
            {options.map((op, i) => (
              <Select.Item key={i} value={op.type}>
                {t(op.type)}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
}
