import { Link } from "@/i18n/navigation";
import { Button } from "@radix-ui/themes";
import { useTranslations } from "next-intl";

export function SignInButton() {
  const t = useTranslations("sign-in");
  return (
    <Link href="/signin" passHref style={{ flexShrink: "0" }}>
      <Button>{t("title")}</Button>
    </Link>
  );
}
