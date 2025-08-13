"use client";
import { TextField } from "@radix-ui/themes";
import { CustomIdFieldProps } from "./custom-id-field";

export function CustomIdSequencField(props: CustomIdFieldProps) {
  const { format, onChange } = props;
  return (
    <TextField.Root
      value={format}
      onChange={(e) => onChange(e.target.value)}
      placeholder="[D:5]"
      size="3"
    ></TextField.Root>
  );
}
