import { Flex } from "@radix-ui/themes";
import { useIntersectionObserver } from "@siberiacancode/reactuse";
import React from "react";

export function InfiniteScroll(
  props: React.PropsWithChildren<{ loadMore(): void }>,
) {
  const { children, loadMore } = props;
  const { ref } = useIntersectionObserver<HTMLDivElement>({
    threshold: 1,
    onChange: (entry) => {
      if (entry.isIntersecting) loadMore();
    },
  });
  return (
    <Flex direction="column">
      {children}
      <div ref={ref} />
    </Flex>
  );
}
