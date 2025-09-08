"use client";
import { useSearch } from "@/hooks/use-search";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useDebounceCallback } from "@siberiacancode/reactuse";
import React from "react";
import { InventoryAccessUserSelector } from "./user-selector";
import { MultiValue } from "react-select";
import { UserHit } from "@/types/typesense";
import { useTranslations } from "next-intl";

export function InventoryAccessUserAddDialog(props: {
  onSelect(users: UserHit[]): void;
}) {
  const t = useTranslations("inventory.access.add-user");
  const label = useTranslations("labels");
  const [selectedItems, setSelectItems] = React.useState<MultiValue<UserHit>>(
    [],
  );
  const { onSelect } = props;
  const [inputValue, setInputValue] = React.useState("");

  const { data, refetch, isLoading } = useSearch<UserHit>({
    collection: "users",
    search: { q: inputValue, query_by: "email,name", limit_hits: 5 },
  });

  const debouncedRefetch = useDebounceCallback(refetch, 500);

  function handeInputChange(input: string) {
    setInputValue(input);
    debouncedRefetch();
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>{t("button")}</Button>
      </Dialog.Trigger>
      <Dialog.Content
        width={{ initial: "100%", lg: "30%" }}
        style={{ overflow: "visible" }}
      >
        <Flex direction="column" mb="4">
          <Dialog.Title weight="medium">{t("title")}</Dialog.Title>
        </Flex>
        <Dialog.Description></Dialog.Description>
        <Flex direction="column" gap="6">
          <InventoryAccessUserSelector
            users={data}
            isLoading={isLoading}
            onInputChange={handeInputChange}
            onSelect={setSelectItems}
          />
          <Flex justify={"end"} align="center" gap="4">
            <Dialog.Close>
              <Button variant="ghost">{label("cancel")}</Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={() => onSelect(selectedItems as UserHit[])}>
                {label("save")}
              </Button>
            </Dialog.Close>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
