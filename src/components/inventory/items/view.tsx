"use client";

import { DataTable } from "@/components/data-table";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { useRouter } from "@/i18n/navigation";
import { Inventory, InventoryField, InventoryItem } from "@prisma/client";
import { Button, Checkbox, Flex } from "@radix-ui/themes";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface Props {
  inventory: Inventory;
  fields: InventoryField[];
  items: InventoryItem[];
  onLoadMore(): void;
}

export function InventoryItemsView(props: Props) {
  const router = useRouter();
  const { fields, items, onLoadMore } = props;
  const columns: ColumnDef<InventoryItem>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Flex align="center" height="100%">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
          />
        </Flex>
      ),
      cell: ({ row }) => (
        <Flex align="center" height="100%">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </Flex>
      ),
    },
    {
      header: "ID",
      accessorKey: "customId",
    },
    ...fields
      .filter((f) => f.isVisible)
      .map((field) => {
        return {
          header: field.title,
          accessorKey: field.type + field.slot,
        };
      }),
  ];

  const table = useReactTable({
    columns,
    data: items,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Flex direction="column">
      <Flex my="4">
        {table.getIsAllPageRowsSelected() ||
          (table.getIsSomeRowsSelected() && (
            <Button variant="surface">Delete</Button>
          ))}
        <Flex ml="auto">
          <Button onClick={() => router.push(`items/create`)}>Create</Button>
        </Flex>
      </Flex>
      <InfiniteScroll loadMore={onLoadMore}>
        <DataTable
          table={table}
          onRowClick={({ original: item }) =>
            router.push(`items/${item.customId}`)
          }
        />
      </InfiniteScroll>
    </Flex>
  );
}
