import { Card, Flex, Heading, Text, Separator } from "@radix-ui/themes";
import { SignInForm } from "@/components/auth/signin-form";
import { AuthOptions } from "@/components/auth/auth-options";
import { useTranslations } from "next-intl";
import { emailVerification } from "../actions";

export default function Page() {
  const t = useTranslations("SignIn");
  return (
    <Flex
      justify="center"
      align="center"
      overflow="hidden"
      style={{ height: "100vh" }}
    >
      <Flex
        direction={"column"}
        width={{ initial: "100%", sm: "50%", lg: "30%" }}
        px="4"
      >
        <Card size="4" style={{ boxShadow: "var(--shadow-4)" }}>
          <Heading as="h3" size="6" trim="start" mb="5">
            {t("title")}
          </Heading>
          <SignInForm verifyAction={emailVerification} />
          <Flex align="center" gap="4" my="4">
            <Separator size="4" />
            <Text color="gray" size="2">
              or
            </Text>
            <Separator size="4" />
          </Flex>
          <AuthOptions />
        </Card>
      </Flex>
    </Flex>
  );
}
