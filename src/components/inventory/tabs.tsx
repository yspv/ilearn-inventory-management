"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { TabNav } from "@radix-ui/themes";
import { useTranslations } from "next-intl";

export default function InventoryTabs() {
  const pathname = usePathname();
  const [, path, id] = pathname.split("/");
  const basePath = `/${path}/${id}`;
  const t = useTranslations("inventory.tab");
  const tabs = [
    {
      title: t("items"),
      href: "",
    },
    {
      title: t("discussion"),
      href: "/discussion",
    },
    {
      title: t("settings"),
      href: "/settings",
    },
    {
      title: t("customId"),
      href: "/custom-id",
    },
    {
      title: t("access"),
      href: "/access",
    },
    {
      title: t("fields"),
      href: "/fields",
    },
    {
      title: t("stats"),
      href: "/stats",
    },
  ];

  return (
    <TabNav.Root size="2">
      {tabs.map((tab, i) => {
        const href = basePath + tab.href;
        return (
          <TabNav.Link key={i} active={href === pathname} asChild>
            <Link href={href}>{tab.title}</Link>
          </TabNav.Link>
        );
      })}
    </TabNav.Root>
  );
}
