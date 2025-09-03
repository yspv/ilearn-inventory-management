import { InventoryField } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { CustomFieldInput } from "./custom-field-input";
import { Control, UseFormRegister } from "react-hook-form";

export function InventoryItemForm(props: {
  fields: InventoryField[];
  register: UseFormRegister<any>;
  control: Control<any>;
}) {
  const { fields, control, register } = props;
  return (
    <Flex direction="column" gap="4">
      {fields.map((field, i) => {
        return (
          <CustomFieldInput
            key={i}
            field={field}
            control={control}
            register={register(field.type + field.slot, {
              valueAsNumber: field.type === "num",
            })}
          />
        );
      })}
    </Flex>
  );
}
