"use client";
import { UserHit } from "@/types/typesense";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Avatar, Badge, Flex, Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import Select, { components, MultiValue } from "react-select";

interface Props {
  users?: UserHit[];
  isLoading: boolean;
  onInputChange(input: string): void;
  onSelect(user: MultiValue<UserHit>): void;
}

export function InventoryAccessUserSelector(props: Props) {
  const { users, isLoading, onInputChange, onSelect } = props;
  const t = useTranslations("inventory.access");
  return (
    <Select
      isMulti
      options={users?.map((u) => ({
        ...u,
        value: u.name,
        label: u.email,
      }))}
      placeholder={t("placeholder")}
      classNamePrefix="rs"
      unstyled
      isLoading={isLoading}
      onInputChange={onInputChange}
      onChange={onSelect}
      styles={{ menu: (base) => ({ ...base, zIndex: 10 }) }}
      components={{
        MultiValueContainer: (props) => (
          <Badge size="2" m="1">
            {props.children}
          </Badge>
        ),
        MultiValueRemove: (props) => (
          <components.MultiValueRemove {...props}>
            <Cross1Icon />
          </components.MultiValueRemove>
        ),
        Option: (props) => (
          <components.Option {...props}>
            <Flex align="center" gap="2" px="2">
              <Avatar
                src={props.data.image}
                fallback={props.data.name[0]}
                radius="full"
              />
              <Flex direction="column">
                <Text>{props.data.name}</Text>
                <Text size="2">{props.data.email}</Text>
              </Flex>
            </Flex>
          </components.Option>
        ),
      }}
    />
  );
}
