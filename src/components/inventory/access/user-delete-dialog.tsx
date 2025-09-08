"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useTranslations } from "next-intl";

export function InventoryAccessUserDelete(props: { onAction(): void }) {
  const { onAction } = props;
  const t = useTranslations("inventory.access.delete-user");
  const label = useTranslations("labels");
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="surface">
          {t("button")}
          <TrashIcon />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content width={{ initial: "100%", lg: "30%" }}>
        <AlertDialog.Title>{t("title")}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          {t("description")}
        </AlertDialog.Description>
        <Flex justify="end" gap="4" mt="4">
          <AlertDialog.Cancel>
            <Button variant="outline">{label("cancel")}</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={onAction}>{label("delete")}</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
