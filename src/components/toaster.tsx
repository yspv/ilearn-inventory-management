"use client";
import { useTheme } from "next-themes";
import React from "react";
import { Toaster as Sonner, ToasterProps } from "sonner";

export function Toaster() {
  const { theme } = useTheme();
  return (
    <Sonner
      theme={(theme as ToasterProps["theme"]) || "system"}
      style={
        {
          "--normal-bg": "var(--gray-2)",
          "--normal-border": "var(--gray-a7)",
        } as React.CSSProperties
      }
    />
  );
}
