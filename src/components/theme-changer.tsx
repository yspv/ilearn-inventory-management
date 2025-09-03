"use client";

import { MoonIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useTheme } from "next-themes";

export function ThemeChanger() {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant="ghost"
      size="1"
      color="gray"
    >
      <MoonIcon height="1.25rem" width="1.25rem" />
    </Button>
  );
}
