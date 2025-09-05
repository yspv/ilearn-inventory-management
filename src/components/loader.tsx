import { Flex, Spinner } from "@radix-ui/themes";

export function Loader() {
  return (
    <Flex
      position="absolute"
      top="50%"
      left="50%"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <Spinner size="3" />
    </Flex>
  );
}
