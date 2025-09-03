"use client";
import { InventoryField, InventoryItem, User } from "@prisma/client";
import { HeartIcon } from "@radix-ui/react-icons";
import { Button, DataList, Flex, Grid, Heading, Link } from "@radix-ui/themes";
import { CustomFieldInput } from "./custom-field-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { schema } from "./schema";

interface Props {
  fields: InventoryField[];
  item: InventoryItem;
  owner: User;
  onSave(changes: any): void;
}

type Schema = z.infer<typeof schema>;

export function InventoryItemsItemView(props: Props) {
  const { item, owner, fields, onSave } = props;
  const { handleSubmit, register, control } = useForm<
    z.input<typeof schema>,
    z.output<typeof schema>
  >({
    defaultValues: { ...(item as Schema) },
    resolver: zodResolver(schema),
    disabled: owner.id !== item.ownerId,
  });

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <Grid columns={{ initial: "1", lg: "3" }} mb="6">
        <Flex direction="column" gap="6" mt="4">
          <Flex align="center" gap="4">
            <Heading as="h2" size="4">
              {item.customId}
            </Heading>
          </Flex>
          <DataList.Root>
            <DataList.Item>
              <DataList.Label>Owner</DataList.Label>
              <DataList.Value>
                <Link>{owner.name}</Link>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Created At</DataList.Label>
              <DataList.Value>{item.createdAt.toLocaleString()}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Updated At</DataList.Label>
              <DataList.Value>{item.updatedAt.toLocaleString()}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Likes</DataList.Label>
              <DataList.Value>
                <Button size="1" variant="ghost">
                  <HeartIcon />
                  10
                </Button>
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
          <Flex direction="column" gap="4">
            {fields.map((field, i) => {
              return (
                <CustomFieldInput
                  key={i}
                  field={field}
                  control={control}
                  register={register((field.type + field.slot) as any)}
                />
              );
            })}
          </Flex>
          <Flex gap="2">
            <Button type="submit">Save</Button>
          </Flex>
        </Flex>
      </Grid>
    </form>
  );
}
