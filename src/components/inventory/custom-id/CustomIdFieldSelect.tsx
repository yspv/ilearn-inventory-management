"use client";
import { Flex, Select } from "@radix-ui/themes";
import { textFieldRootPropDefs } from "@radix-ui/themes/components/text-field.props";

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
    type: "32bit",
  },
  {
    title: "20-bit random",
    type: "20bit",
  },
  {
    title: "6-digit random",
    type: "6digit",
  },
  {
    title: "9-digit",
    type: "9digit",
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
  onChange: (type: string) => void;
}) {
  const { field, onChange } = props;
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
                {op.title}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
}
