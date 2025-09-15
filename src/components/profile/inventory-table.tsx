"use client";
import {
  ColumnFiltersState,
  getCoreRowModel,
  SortingState,
  Updater,
  useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "../data-table";
import { Inventory, User } from "@prisma/client";
import React from "react";
import { columns } from "./column";
import { resolveUpdater, sortingToQuery } from "@/utils";
import { InfiniteScroll } from "../infinite-scroll";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export interface Props {
  isOwner: boolean;
  user?: User;
  data: (Inventory & { owner: User })[];
  defaultFilter: "me" | "notMe" | "anyone";
  onFilterChange(filters: Record<string, any>): void;
  onSortChange(state: Record<string, string>): void;
  loadMore(): void;
}

export function ProfileInventoryTable(props: Props) {
  const {
    data,
    isOwner,
    defaultFilter,
    onFilterChange,
    onSortChange,
    loadMore,
  } = props;
  const t = useTranslations("profile.columns");
  const router = useRouter();

  const [filters, setFilters] = React.useState<ColumnFiltersState>([
    { id: "owner", value: defaultFilter },
  ]);
  const [sort, setSort] = React.useState<SortingState>([]);

  function handleFiltersChange(updaterOrValue: Updater<ColumnFiltersState>) {
    const newState = resolveUpdater(updaterOrValue, filters);
    setFilters(newState);
    onFilterChange(newState.map((f) => ({ field: f.id, value: f.value })));
  }

  function handleSortingChange(updaterOrValue: Updater<SortingState>) {
    const newState = resolveUpdater(updaterOrValue, sort);
    setSort(newState);
    onSortChange(sortingToQuery(newState));
  }

  const table = useReactTable({
    columns: columns(t, isOwner),
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
    manualSorting: true,
    onColumnFiltersChange: handleFiltersChange,
    onSortingChange: handleSortingChange,
    state: {
      columnFilters: filters,
      sorting: sort,
    },
  });
  return (
    <InfiniteScroll loadMore={loadMore}>
      <DataTable
        table={table}
        onRowClick={(row) => router.push(`/inventory/${row.original.id}/items`)}
      />
    </InfiniteScroll>
  );
}
