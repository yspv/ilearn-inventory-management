import { usePathname, useRouter } from "@/i18n/navigation";
import { Select } from "@radix-ui/themes";
import { useLocale } from "next-intl";

export function LanguageSelect() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function changeLanguage(locale: string) {
    router.replace(pathname, { locale });
  }

  return (
    <Select.Root defaultValue={locale} onValueChange={changeLanguage}>
      <Select.Trigger />
      <Select.Content position="popper" align="end">
        <Select.Item value="en">English</Select.Item>
        <Select.Item value="de">Deutsch</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}
