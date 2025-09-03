import { Inventory } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";




export const column: ColumnDef<Inventory>[] = [
    {
        accessorKey: 'title'
    },
    {
        accessorKey: 'isPrivate'
    },
]