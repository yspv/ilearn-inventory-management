import { DataTableHeader } from "@/components/data-table";
import { User } from "@prisma/client";
import { Avatar, Checkbox, Flex, Text } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Flex align="center" height="100%">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      </Flex>
    ),
    cell: ({ row }) => (
      <Flex align="center" height="100%">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      </Flex>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableHeader column={column} title={"Name"} />,
    cell: ({ row }) => {
      return (
        <Flex align="center" gap="2">
          <Avatar
            src={row.original.image || undefined}
            size="1"
            fallback="A"
            radius="full"
          />
          <Text size="2" weight="medium">
            {row.original.name}
          </Text>
        </Flex>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableHeader column={column} title="Email" />,
  },
];
