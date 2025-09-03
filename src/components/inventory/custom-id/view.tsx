"use client";
import { SortableList } from "@/components/sortable/sortable-list";
import { Button, Callout, Flex, Grid, Heading } from "@radix-ui/themes";
import { CustomIdFieldSelect } from "./custom-id-select";
import { CustomIdField } from "./custom-id-field";
import { useList } from "@siberiacancode/reactuse";
import React from "react";
import { schema } from "@/trpc/router/custom-id-field/schema";
import { useAutoSave } from "@/components/auto-save/provider";
import { SafeParseReturnType } from "zod";
import { useTranslations } from "next-intl";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface Props {
  example?: string;
  fields: {
    type: string;
    format: string;
    order: number;
  }[];
  onSave(value: any): Promise<void>;
}

export function InventoryCustomIdView(props: Props) {
  const { example, fields, onSave } = props;
  const t = useTranslations("inventory.custom-id.errors");
  const [errors, setErrors] = React.useState<SafeParseReturnType<any, any>>();

  const { value, set, push } = useList(
    fields.map((f) => ({ ...f, id: f.order })),
  );

  async function handleSave() {
    await onSave(value.map((f, i) => ({ ...f, order: i })));
  }

  function validation() {
    const error = schema.safeParse(value);
    setErrors(error);
    return error.success;
  }

  function handleOnChange(item: any, format: string) {
    set((prev) => prev.map((p) => (p.id === item.id ? { ...p, format } : p)));
  }

  useAutoSave(value, handleSave, 5000, validation);

  return (
    <Flex direction="column" gap="4" py="4">
      {errors?.error?.issues.map((err, i) => (
        <Callout.Root color="red" key={i}>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{t(err.message)}</Callout.Text>
        </Callout.Root>
      ))}
      <Heading size="4">Example: {example}</Heading>
      <Grid columns={{ initial: "1", lg: "2" }} gap="6" mt="2">
        <Flex direction="column" gap="6">
          <SortableList
            items={value}
            onChange={set}
            onDelete={(id) => {
              set((prev) => prev.filter((p) => p.id !== id));
            }}
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
                          set((prevFields) =>
                            prevFields.map((f) =>
                              f.id === item.id ? { ...item, type } : f,
                            ),
                          );
                        }}
                      />
                      <CustomIdField
                        type={item.type}
                        format={item.format}
                        onChange={(format) => {
                          handleOnChange(item, format);
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
              const order = value.length + 1;
              push({ id: order, type: "fixed", format: "", order });
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
