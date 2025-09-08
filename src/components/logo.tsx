import { Link } from "@/i18n/navigation";
import { CubeIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";

export function Logo() {
  return (
    <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
      <Flex align="center" gap="3">
        <CubeIcon width="1.25rem" height="1.25rem" />
        <Text size="4" align="center" weight="medium">
          Inventory
        </Text>
      </Flex>
    </Link>
  );
}
