"use client";
import React from "react";
import { Flex, Grid } from "@radix-ui/themes";
import { SortableList } from "@/components/sortable";
import { useList } from "@siberiacancode/reactuse";
import { InventoryField } from "@prisma/client";
import { useAutoSave } from "@/components/auto-save/provider";
import { InventoryFieldDialogAdd } from "./field-dialog-add";
import { InventoryFieldDialogUpdate } from "./field-dialog-update";

interface Props {
  fields: InventoryField[];
  onSave(fields: any): Promise<void>;
}

export function InventoryFieldsView(props: Props) {
  const { fields: data, onSave } = props;
  const { value: fields, set, push } = useList<any>(data);

  function updateField(field: any, value: any) {
    set((prev) =>
      prev.map((p) => (p.id === field.id ? { ...p, ...value } : p)),
    );
  }

  async function handleSave() {
    await onSave(fields.map((f, i) => ({ ...f, orderIndex: i })));
  }

  useAutoSave(fields, handleSave, 5000);

  return (
    <Flex direction="column" gap="4" py="4">
      <Grid columns={{ initial: "1", lg: "3" }} gap="6" mt="2">
        <Flex direction="column" gap="6">
          <SortableList
            items={fields}
            onChange={set}
            onDelete={(id) => set((prev) => prev.filter((p) => p.id !== id))}
            renderItem={(item) => (
              <SortableList.Item id={item.id}>
                <Grid flexGrow="1" gap="3">
                  <Flex align="center" justify="between" gap="3">
                    <SortableList.DragHandle />
                    <Flex
                      flexGrow="1"
                      justify={"between"}
                      direction={{ initial: "column", lg: "row" }}
                      gap={{ initial: "2", lg: "4" }}
                    >
                      <InventoryFieldDialogUpdate
                        field={item}
                        onUpdate={(data) => updateField(item, data)}
                      />
                    </Flex>
                  </Flex>
                </Grid>
              </SortableList.Item>
            )}
          />
          <Flex>
            <InventoryFieldDialogAdd
              onAdd={(data) => {
                push({ id: fields.length + 1, ...data });
              }}
            />
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  );
}
