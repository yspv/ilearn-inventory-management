"use client";
import { Table } from "@radix-ui/themes";
import { flexRender, Table as ITable, Row } from "@tanstack/react-table";

interface Props<T> {
  table: ITable<T>;
  onRowClick?: (row: Row<T>) => void;
}

export function DataTable<T>(props: Props<T>) {
  const { table, onRowClick } = props;
  return (
    <Table.Root>
      <Table.Header style={{ position: "sticky", top: 0 }}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.ColumnHeaderCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id} onClick={() => onRowClick?.(row)}>
            {row.getVisibleCells().map((cell) => (
              <Table.Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
