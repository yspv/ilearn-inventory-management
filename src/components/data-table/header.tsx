import {
  CaretSortIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { Button, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { Column } from "@tanstack/react-table";

export function DataTableHeader(props: {
  column: Column<any>;
  title: string;
  justify?: "center" | "start" | "end";
}) {
  const { column, title, justify } = props;
  return (
    <Flex justify={justify}>
      {column.getCanSort() ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button size="2" variant="ghost" color="gray" highContrast>
              <Text>{title}</Text>
              {column.getIsSorted() === "desc" && <ChevronDownIcon />}
              {column.getIsSorted() === "asc" && <ChevronUpIcon />}
              {!column.getIsSorted() && <CaretSortIcon />}
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item onClick={() => column.toggleSorting(false)}>
              Asc
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => column.toggleSorting(true)}>
              Desc
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : (
        <Text>{title}</Text>
      )}
    </Flex>
  );
}
