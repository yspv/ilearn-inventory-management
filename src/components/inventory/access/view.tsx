"use client";
import { DataTable } from "@/components/data-table";
import { User } from "@prisma/client";
import {
  getCoreRowModel,
  RowSelectionState,
  SortingState,
  Updater,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { resolveUpdater, sortingToQuery } from "@/utils";
import React from "react";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { InventoryAccessUserAddDialog } from "./user-add-dialog";
import { UserHit } from "@/types/typesense";
import { InventoryAccessUserDelete } from "./user-delete-dialog";
import { useInventory } from "../provider";
import { useRouter } from "@/i18n/navigation";

interface Props {
  data: User[];
  onDeleteUsers(ids: string[]): void;
  onAddUsers(users: UserHit[]): void;
  onSortChange(state: Record<string, string>): void;
  onLoadMore(): void;
}

export function InventoryAccessView(props: Props) {
  const { data, onSortChange, onLoadMore, onDeleteUsers, onAddUsers } = props;
  const { inventory } = useInventory();
  const router = useRouter();
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [sort, setSort] = React.useState<SortingState>([]);

  function handleSortingChange(updaterOrValue: Updater<SortingState>) {
    const newState = resolveUpdater(updaterOrValue, sort);
    setSort(newState);
    onSortChange(sortingToQuery(newState));
  }

  function handleRowSelectionChange(
    updaterOrValue: Updater<RowSelectionState>,
  ) {
    const newState = resolveUpdater(updaterOrValue, rowSelection);
    setRowSelection(newState);
  }

  function handleDeleteUsers() {
    const ids = Object.keys(rowSelection);
    onDeleteUsers(ids);
    setRowSelection({});
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: handleSortingChange,
    onRowSelectionChange: handleRowSelectionChange,
    enableRowSelection: true,
    manualSorting: true,
    state: {
      sorting: sort,
      rowSelection,
    },
    getRowId: (row) => row.id,
  });

  if (!inventory.isPrivate) {
    return (
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width="100%"
        style={{ transform: "translate(-50%, -50%)" }}
        px="4"
      >
        <Flex direction="column" justify={"center"} align={"center"}>
          <Text align={"center"} weight={"bold"}>
            To use the Access Management page, please set your inventory to
            Private first.
          </Text>
          <Button
            mt="4"
            onClick={() => router.push(`/inventory/${inventory.id}/settings`)}
          >
            Go to Settings
          </Button>
        </Flex>
      </Box>
    );
  }

  return (
    <Flex direction="column">
      <Flex width="100%" align="center" my="4">
        {(table.getIsAllRowsSelected() || table.getIsSomeRowsSelected()) && (
          <InventoryAccessUserDelete onAction={handleDeleteUsers} />
        )}
        <Box ml="auto">
          <InventoryAccessUserAddDialog onSelect={onAddUsers} />
        </Box>
      </Flex>
      <InfiniteScroll loadMore={onLoadMore}>
        <DataTable table={table} />
      </InfiniteScroll>
    </Flex>
  );
}
