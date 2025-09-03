import { Header } from "@/components/header";
import { Box } from "@radix-ui/themes";
import React from "react";

export default function Layout(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
}
