"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
});

interface Props {
  onSubmit(data: any): void;
}

export function SalesforceDialog(props: Props) {
  const { onSubmit } = props;
  const t = useTranslations("profile.salesforce");
  const { handleSubmit, register } = useForm({
    defaultValues: { firstName: "", lastName: "", email: "" },
    resolver: zodResolver(schema),
  });
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline">{t("title")}</Button>
      </Dialog.Trigger>
      <Dialog.Content
        aria-describedby="none"
        size="4"
        width={{ initial: "100%", lg: "30%" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Dialog.Title>{t("title")}</Dialog.Title>
          <Flex direction="column">
            <Text size="2" weight="medium" mb="2">
              {t("firstName")}
            </Text>
            <TextField.Root {...register("firstName")} />
            <Text size="2" weight="medium" mt="4" mb="2">
              {t("lastName")}
            </Text>
            <TextField.Root {...register("lastName")} />
            <Text size="2" weight="medium" mb="2" mt="4">
              {t("email")}
            </Text>
            <TextField.Root {...register("email")} />
            <Dialog.Close>
              <Button mt="6" type="submit">
                {t("save")}
              </Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
