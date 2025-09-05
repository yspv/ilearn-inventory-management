import { InfoCircledIcon } from "@radix-ui/react-icons";
import { TRPC_ERROR_CODE_KEY } from "@trpc/server";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type ErrorAction = Partial<
  Record<TRPC_ERROR_CODE_KEY, { label: string; action: () => void }>
>;

export function useErrorToaster(actions?: ErrorAction) {
  const t = useTranslations("errors");

  function toastError(code: string = "ERROR") {
    const title = t(`${code}.title`);
    const description = t(`${code}.description`);
    const action = actions?.[code as TRPC_ERROR_CODE_KEY];
    toast(title, {
      icon: <InfoCircledIcon />,
      description,
      duration: 9000,
      position: "top-center",
      action: action
        ? {
            label: action.label,
            onClick: action.action,
          }
        : undefined,
    });
  }
  return toastError;
}
