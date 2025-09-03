"use client";
import { Badge, Spinner } from "@radix-ui/themes";
import { useAutoSaveStatus } from "./provider";
import { useTranslations } from "next-intl";

const statusColor: Record<string, string> = {
  idle: "blue",
  notSaved: "yellow",
  pending: "blue",
  success: "green",
  error: "red",
};

export function AutoSaveStatus() {
  const { status } = useAutoSaveStatus();
  const t = useTranslations("auto-save.status");
  return (
    <Badge color={statusColor[status] as any} size="2">
      {status === "pending" && <Spinner size="1" />}
      {t(status)}
    </Badge>
  );
}
