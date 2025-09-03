"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { InventoryField } from "@prisma/client";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import { Button, Flex, Grid } from "@radix-ui/themes";
import { InventoryItemForm } from "./form";

interface Props {
  fields: InventoryField[];
  onSave(data: any): void;
}

export function InventoryItemCreateView(props: Props) {
  const { fields, onSave } = props;
  const { formState, handleSubmit, register, control } = useForm({
    defaultValues: {
      num1: 0,
      num2: 0,
      num3: 0,
      boolean1: false,
      boolean2: false,
      boolean3: false,
    },
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <Grid columns={{ initial: "1", lg: "3" }}>
        <Flex direction="column">
          <InventoryItemForm
            fields={fields}
            control={control}
            register={register}
          />
          <Flex direction="column" mt="6">
            <Button disabled={formState.isSubmitSuccessful} type="submit">
              Save
            </Button>
          </Flex>
        </Flex>
      </Grid>
    </form>
  );
}
