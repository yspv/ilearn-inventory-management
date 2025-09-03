"use client";

import { InventoryField } from "@prisma/client";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import {
  Flex,
  Switch,
  Text,
  TextArea,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { Control, Controller, UseFormRegisterReturn } from "react-hook-form";

type FieldProps = {
  field: InventoryField;
  register: UseFormRegisterReturn<any>;
  control: Control<any>;
};

const fields: Record<string, (props: FieldProps) => React.ReactNode> = {
  mlText: ({ field, register }) => (
    <Flex direction="column" gap="2">
      <TextArea
        {...register}
        size="3"
        resize="vertical"
        required={field.required}
        style={{ width: "100%" }}
      />
      <Text size="2" color="gray">
        {field.description}
      </Text>
    </Flex>
  ),
  num: ({ field, register }) => (
    <TextField.Root
      {...register}
      size="3"
      type="number"
      required={field.required}
    >
      <TextField.Slot side="right">
        <Tooltip content={field.description}>
          <QuestionMarkCircledIcon />
        </Tooltip>
      </TextField.Slot>
    </TextField.Root>
  ),
  link: ({ field, register }) => (
    <TextField.Root {...register} size="3" type="url" required={field.required}>
      <TextField.Slot side="right">
        <Tooltip content={field.description}>
          <QuestionMarkCircledIcon />
        </Tooltip>
      </TextField.Slot>
    </TextField.Root>
  ),
  boolean: ({ field, register, control }) => (
    <Controller
      name={register.name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <Flex align="center" gap="4">
          <Switch
            {...register}
            defaultChecked={value}
            onCheckedChange={(state) => onChange(!!state)}
          />
          <Tooltip content={field.description}>
            <QuestionMarkCircledIcon />
          </Tooltip>
        </Flex>
      )}
    />
  ),
  string: ({ field, register }) => (
    <TextField.Root
      {...register}
      size="3"
      type="text"
      required={field.required}
    >
      <TextField.Slot side="right">
        <Tooltip content={field.description}>
          <QuestionMarkCircledIcon />
        </Tooltip>
      </TextField.Slot>
    </TextField.Root>
  ),
};

export function CustomFieldInput(props: {
  field: InventoryField;
  register: UseFormRegisterReturn<any>;
  control: Control<any>;
}) {
  const { field, register, control } = props;
  const Field = fields[field.type]?.({ field, register, control });
  return (
    <Flex direction="column">
      <Text size="3" mb="2" weight="medium">
        {field.title}
      </Text>
      {Field}
    </Flex>
  );
}
