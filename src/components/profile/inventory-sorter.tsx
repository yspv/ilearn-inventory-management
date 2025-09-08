import { Select, Text } from "@radix-ui/themes";
import { Table } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

export function ProfileInventorySorter<T>(props: { table: Table<T> }) {
  const { table } = props;
  const t = useTranslations("profile.sorting");
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
        <Select.Item value="updatedAt">{t("lastModified")}</Select.Item>
        <Select.Item value="isPrivate">{t("private")}</Select.Item>
        <Select.Item value="title">{t("title")}</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}
