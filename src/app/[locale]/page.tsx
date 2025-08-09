import Header from "@/components/Header";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { Button, Flex, Text } from "@radix-ui/themes";
import { getLocale } from "next-intl/server";

export default async function Home() {
  const session = await auth();
  const locale = await getLocale();
  if (!session) redirect({ href: { pathname: "/signin" }, locale });
  return (
    <>
      <Header />
      <Flex direction="column" gap="2">
        <Text>Hello world</Text>
        <Button>Let&apos;s go</Button>
      </Flex>
    </>
  );
}
