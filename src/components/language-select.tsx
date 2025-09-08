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
      <Select.Content>
        <Select.Item value="en">En</Select.Item>
        <Select.Item value="de">De</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}
