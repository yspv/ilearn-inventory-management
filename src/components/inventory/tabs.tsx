"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { TabNav } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { useInventory } from "./provider";

export default function InventoryTabs() {
  const { isOwner, isAdmin } = useInventory();
  const pathname = usePathname();
  const [, path, id] = pathname.split("/");
  const basePath = `/${path}/${id}`;
  const t = useTranslations("inventory.tab");
  const tabs = [
    {
      title: t("items"),
      href: "/items",
    },
    {
      title: t("discussion"),
      href: "/discussion",
    },
    {
      title: t("settings"),
      href: "/settings",
      private: true,
    },
    {
      title: t("customId"),
      href: "/custom-id",
      private: true,
    },
    {
      title: t("access"),
      href: "/access",
      private: true,
    },
    {
      title: t("fields"),
      href: "/fields",
      private: true,
    },
    {
      title: t("stats"),
      href: "/stats",
    },
  ];

  return (
    <TabNav.Root size="2">
      {tabs
        .filter((t) => (isOwner || isAdmin ? true : !t.private))
        .map((tab, i) => {
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
