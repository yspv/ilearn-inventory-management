"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
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
  const { handleSubmit, register } = useForm({
    defaultValues: { firstName: "", lastName: "", email: "" },
    resolver: zodResolver(schema),
  });
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline">Saleforce</Button>
      </Dialog.Trigger>
      <Dialog.Content
        aria-describedby="none"
        size="4"
        width={{ initial: "100%", lg: "30%" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Dialog.Title>Integrate Salesforce</Dialog.Title>
          <Flex direction="column">
            <Text size="2" weight="medium" mb="2">
              First Name
            </Text>
            <TextField.Root {...register("firstName")} />
            <Text size="2" weight="medium" mt="4" mb="2">
              Last Name
            </Text>
            <TextField.Root {...register("lastName")} />
            <Text size="2" weight="medium" mb="2" mt="4">
              Email
            </Text>
            <TextField.Root {...register("email")} />
            <Dialog.Close>
              <Button mt="6" type="submit">
                Save
              </Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
