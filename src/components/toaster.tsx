"use client";
import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

export function Toaster() {
  const { theme } = useTheme();
  return <Sonner theme={(theme as ToasterProps["theme"]) || "system"} />;
}
