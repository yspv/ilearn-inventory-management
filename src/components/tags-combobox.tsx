"use client";
import React from "react";
import { useDebounceCallback } from "@siberiacancode/reactuse";
import CreatableSelect from "react-select/creatable";
import { useSearch } from "@/hooks/use-search";

type Tag = {
  name: string;
};

export function TagsCombobox(props: {
  initial?: Tag[];
  onChange(items: Tag[]): void;
}) {
  const { initial, onChange } = props;
  const [inputValue, setInputValue] = React.useState("");

  const { data, refetch } = useSearch<{ name: string }>({
    collection: "tags",
    search: { q: inputValue, query_by: "name", limit_hits: 5 },
  });

  const debouncedRefetch = useDebounceCallback(refetch, 500);

  function handleInput(value: string) {
    setInputValue(value);
    debouncedRefetch();
  }

  return (
    <CreatableSelect
      inputValue={inputValue}
      onInputChange={handleInput}
      defaultValue={initial?.map((i) => ({ value: i.name, label: i.name }))}
      onChange={(tags) => onChange(tags.map((t) => ({ name: t.value })))}
      options={data?.map((t) => ({ value: t.name, label: t.name }))}
      isClearable
      isMulti
      unstyled
      classNamePrefix="rs"
      styles={{
        menu: (base) => ({ ...base, zIndex: 10 }),
      }}
    />
  );
}
