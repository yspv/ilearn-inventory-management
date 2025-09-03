import { Select, Text } from "@radix-ui/themes";
import { Table } from "@tanstack/react-table";

export function ProfileInventorySorter<T>(props: { table: Table<T> }) {
  const { table } = props;
  return (
    <Select.Root
      defaultValue="updatedAt"
      onValueChange={(value) => {
        table.setSorting([{ id: value, desc: true }]);
      }}
    >
      <Select.Trigger variant="ghost" color="gray">
        <Text weight="bold" as="span">
          A-Z
        </Text>
      </Select.Trigger>
      <Select.Content position="popper" align="end">
        <Select.Item value="updatedAt">Last Modified</Select.Item>
        <Select.Item value="isPrivate">Private</Select.Item>
        <Select.Item value="title">Title</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}
