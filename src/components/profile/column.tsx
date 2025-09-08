import { ColumnDef } from "@tanstack/react-table";
import { DataTableHeader } from "../data-table";
import { Inventory, User } from "@prisma/client";
import { Flex, Text, Tooltip } from "@radix-ui/themes";
import { ProfileInventoryFilter } from "./inventory-filter";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { ProfileInventorySorter } from "./inventory-sorter";

export const columns = (
  t: (key: string) => string,
): ColumnDef<Inventory & { owner: User }>[] => [
  {
    accessorKey: "title",
    header: ({ column }) => DataTableHeader({ title: t("title"), column }),
    cell: ({ row }) => {
      const { title, isPrivate } = row.original;
      return (
        <Flex align="center" gap="2">
          <Text>{title}</Text>
          {isPrivate && (
            <Tooltip content="Private">
              <LockClosedIcon />
            </Tooltip>
          )}
        </Flex>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "owner",
    header: ({ column }) => (
      <Flex justify="end">
        <ProfileInventoryFilter column={column} />
      </Flex>
    ),
    cell: ({ row }) => (
      <Flex justify="end">
        <Text align="left">{row.original.owner.name}</Text>
      </Flex>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) =>
      DataTableHeader({ justify: "end", title: t("updatedAt"), column }),
    cell: ({ row }) => {
      const { updatedAt } = row.original;
      return (
        <Flex justify="end">
          <Text weight="light">{updatedAt.toLocaleString("en")}</Text>
        </Flex>
      );
    },
    enableSorting: false,
  },
  {
    id: "sort",
    header: ({ table }) => (
      <Flex justify="end">
        <ProfileInventorySorter table={table} />
      </Flex>
    ),
  },
];
