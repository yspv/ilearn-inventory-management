import { Inventory } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";

export interface Props {
  inventories: Inventory[];
}

export function InventoryGalary(props: Props) {
  const { inventories } = props;
  return (
    <Flex justify="center" align="center" gap="4">
      {inventories.map((inventory) => (
        <Flex key={inventory.id} direction="column" gap="2">
          <Card asChild style={{ width: 150, height: 200 }}>
            <a href="#">
              <Flex
                direction="column"
                justify="center"
                align="center"
                style={{ height: "100%" }}
              ></Flex>
            </a>
          </Card>
          <Text size="2">Inventory Title</Text>
        </Flex>
      ))}
    </Flex>
  );
}
