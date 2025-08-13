import { TextField } from "@radix-ui/themes";
import { CustomIdFieldProps } from "./custom-id-field";

export default function CustomIdDateTimeField(props: CustomIdFieldProps) {
  const { format, onChange } = props;
  return (
    <TextField.Root
      size="3"
      value={format}
      onChange={(e) => onChange(e.target.value)}
    ></TextField.Root>
  );
}
