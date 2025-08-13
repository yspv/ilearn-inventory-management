import { CustomIdInput } from "@/components/inventory/custom-id/custom-id-input";

export default function Page() {
  return (
    <>
      <CustomIdInput fields={[{ type: "datetime", format: "[YYYY/MM/DD]" }]} />
    </>
  );
}
