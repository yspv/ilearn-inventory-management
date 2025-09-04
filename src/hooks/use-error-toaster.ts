import { InfoCircledIcon } from "@radix-ui/react-icons";
import { TRPC_ERROR_CODE_KEY } from "@trpc/server";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useErrorToaster() {
  const t = useTranslations("errors");
  function toastError(code: TRPC_ERROR_CODE_KEY) {
    const title = t(`${code}.title`);
    const description = t(`${code}.description`);
    toast(title, {
      icon: InfoCircledIcon({}),
      description,
      duration: 9000,
      position: "top-center",
    });
  }
  return toastError;
}
