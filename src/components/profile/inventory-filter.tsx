import { Column } from "@tanstack/react-table";
import { Select } from "@radix-ui/themes";

export function ProfileInventoryFilter(props: { column: Column<any> }) {
  const { column } = props;
  const options = [
    {
      title: "Owned by me",
      value: "me",
    },
    {
      title: "Owned not by me",
      value: "notMe",
    },
    {
      title: "Owned by anyone",
      value: "anyone",
    },
  ];
  return (
    <Select.Root
      defaultValue="anyone"
      onValueChange={(value) => column.setFilterValue(value)}
    >
      <Select.Trigger
        variant="ghost"
        style={{ fontWeight: "bold" }}
        color="gray"
      />
      <Select.Content position="popper" align="end">
        {options.map(({ value, title }, i) => (
          <Select.Item key={i} value={value}>
            {title}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
