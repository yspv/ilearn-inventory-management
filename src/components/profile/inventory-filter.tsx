import { Column } from "@tanstack/react-table";
import { Select } from "@radix-ui/themes";
import { useTranslations } from "next-intl";

interface Props {
  column: Column<any>;
  isOwner: boolean;
}

export function ProfileInventoryFilter(props: Props) {
  const { column, isOwner } = props;
  const t = useTranslations("profile.filters");
  const name = isOwner ? "me" : "user";
  const options = [
    {
      title: t("me", { name }),
      value: "me",
    },
    {
      title: t("notMe", { name }),
      value: "notMe",
    },
    {
      title: t("anyone", { name }),
      value: "anyone",
    },
  ];

  return (
    <Select.Root
      defaultValue="anyone"
      value={column.getFilterValue() as string}
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
