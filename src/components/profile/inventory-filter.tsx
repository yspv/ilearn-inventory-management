import { Column } from "@tanstack/react-table";
import { Select } from "@radix-ui/themes";
import { useTranslations } from "next-intl";

export function ProfileInventoryFilter(props: { column: Column<any> }) {
  const { column } = props;
  const t = useTranslations("profile.filters");
  const options = [
    {
      title: t("me"),
      value: "me",
    },
    {
      title: t("notMe"),
      value: "notMe",
    },
    {
      title: t("anyone"),
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
