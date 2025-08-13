"use client";

import React from "react";
import CustomIdDateTimeField from "./custom-id-datetime-field";
import { CustomIdFixedField } from "./custom-id-fixed-field";
import { CustomIdSequencField } from "./custom-id-sequence-field";
import CustomIdNumberField from "./custom-id-number-field";
import { Flex } from "@radix-ui/themes";

export type CustomIdFieldProps = {
  type: string;
  format: string;
  onChange(e: string): void;
};

const fields: {
  [key: string]: (props: CustomIdFieldProps) => React.ReactNode;
} = {
  fixed: CustomIdFixedField,
  datetime: CustomIdDateTimeField,
  sequence: CustomIdSequencField,
  "20bit": CustomIdNumberField,
  "32bit": CustomIdNumberField,
};

export function CustomIdField(props: CustomIdFieldProps) {
  const { type } = props;
  const Field = fields[type];
  return (
    <Flex direction={"column"} width="100%">
      {Field ? Field(props) : null}
    </Flex>
  );
}
