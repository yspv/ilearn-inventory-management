"use client";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "../data-table";
import { Inventory } from "@prisma/client";
import { useTranslations } from "next-intl";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { useRouter } from "@/i18n/navigation";

const columns: (t: (k: string) => string) => ColumnDef<Inventory>[] = (t) => [
  {
    accessorKey: "title",
    header: t("title"),
  },
  {
    accessorKey: "category.name",
    header: t("category"),
  },
  {
    accessorKey: "isPrivate",
    header: t("isPrivate"),
  },
  {
    accessorKey: "owner.name",
    header: t("owner"),
  },
];

interface Props {
  data: Inventory[];
}

export function InventoryTable(props: Props) {
  const { data } = props;
  const router = useRouter();
  const t = useTranslations("inventory.main");
  const table = useReactTable({
    data,
    columns: columns(t),
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <DataTable
      table={table}
      onRowClick={(row) => router.push(`/inventory/${row.original.id}/items`)}
    />
  );
}
