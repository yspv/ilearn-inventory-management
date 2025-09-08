"use client";
import { InventoryField, InventoryItem, User } from "@prisma/client";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { Button, DataList, Flex, Grid, Heading, Link } from "@radix-ui/themes";
import { CustomFieldInput } from "./custom-field-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { schema } from "./schema";
import { useTranslations } from "next-intl";

interface Props {
  fields: InventoryField[];
  item: InventoryItem;
  owner: User;
  liked: boolean;
  likes: number;
  onLike(): void;
  onSave(changes: any): void;
}

type Schema = z.infer<typeof schema>;

export function InventoryItemsItemView(props: Props) {
  const { item, owner, fields, onSave, onLike, likes, liked } = props;
  const t = useTranslations("inventory.item");
  const label = useTranslations("labels");
  const { handleSubmit, register, control } = useForm<
    z.input<typeof schema>,
    z.output<typeof schema>
  >({
    defaultValues: { ...(item as Schema) },
    resolver: zodResolver(schema),
    disabled: owner.id !== item.ownerId,
  });

  return (
    <Grid columns={{ initial: "1", lg: "3" }} mb="6">
      <Flex direction="column" gap="6" mt="4">
        <Flex align="center" gap="4">
          <Heading as="h2" size="4">
            {item.customId}
          </Heading>
        </Flex>
        <DataList.Root>
          <DataList.Item>
            <DataList.Label>{t("owner")}</DataList.Label>
            <DataList.Value>
              <Link>{owner.name}</Link>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>{t("createdAt")}</DataList.Label>
            <DataList.Value>{item.createdAt.toLocaleString()}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>{t("updatedAt")}</DataList.Label>
            <DataList.Value>{item.updatedAt.toLocaleString()}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Likes</DataList.Label>
            <DataList.Value>
              <Button
                size="1"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onLike();
                }}
              >
                {liked ? <HeartFilledIcon /> : <HeartIcon />}
                {likes}
              </Button>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
        <form onSubmit={handleSubmit(onSave)}>
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
          <Flex gap="2" mt="6">
            <Button type="submit">{label("save")}</Button>
          </Flex>
        </form>
      </Flex>
    </Grid>
  );
}
