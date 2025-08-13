"use client";
import { Button, Flex, Grid, Heading } from "@radix-ui/themes";
import React from "react";
import { SortableList } from "@/components/sortable/sortable-list";
import { CustomIdFieldSelect } from "@/components/inventory/custom-id/CustomIdFieldSelect";
import { CustomIdField } from "@/components/inventory/custom-id/custom-id-field";
import { useCustomId } from "@/hooks/use-custom-id";

export default function Page() {
  const { fields, setFields, deleteField, updateField, addField, getExample } =
    useCustomId();

  return (
    <Flex direction="column" gap="4" py="4">
      <Heading>Example: {getExample()}</Heading>
      <Grid columns={{ initial: "1", lg: "2" }} gap="6" mt="2">
        <Flex direction="column" gap="6">
          <SortableList
            items={fields}
            onChange={setFields}
            onDelete={deleteField}
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
                      <CustomIdFieldSelect
                        field={item}
                        onChange={(type) => {
                          item.type = type;
                          updateField(item);
                        }}
                      />
                      <CustomIdField
                        type={item.type}
                        format={item.format}
                        onChange={(v) => {
                          item.format = v;
                          updateField(item);
                        }}
                      />
                    </Flex>
                  </Flex>
                </Grid>
              </SortableList.Item>
            )}
          />
          <Button
            onClick={() => {
              addField({ type: "fixed", format: "" });
            }}
            style={{ width: "fit-content" }}
          >
            Add Element
          </Button>
        </Flex>
      </Grid>
    </Flex>
  );
}
