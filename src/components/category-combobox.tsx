import { useSearch } from "@/hooks/use-search";
import { useDebounceCallback } from "@siberiacancode/reactuse";
import React from "react";
import CreatableSelect from "react-select/creatable";
import { capitalize } from "lodash";
import { Category } from "@prisma/client";

export function CategoryCombobox(props: {
  initial?: Category;
  onChange(category: { name: string }): void;
}) {
  const { initial, onChange } = props;
  const [inputValue, setInputValue] = React.useState("");

  const { data, refetch } = useSearch<{ name: string }>({
    collection: "categories",
    search: {
      q: inputValue,
      query_by: "name",
      limit_hits: 5,
    },
  });

  const debouncedRefetch = useDebounceCallback(refetch, 500);

  function handleInput(value: string) {
    setInputValue(value);
    debouncedRefetch();
  }

  return (
    <CreatableSelect
      defaultValue={
        initial
          ? { label: capitalize(initial.name), value: initial.name }
          : undefined
      }
      onChange={(c) => {
        if (c) onChange({ name: c.value });
      }}
      inputValue={inputValue}
      onInputChange={handleInput}
      options={data?.map((c) => ({ label: capitalize(c.name), value: c.name }))}
      isClearable
      unstyled={true}
      classNamePrefix="rs"
      styles={{ menu: (base) => ({ ...base, zIndex: 10 }) }}
    />
  );
}
