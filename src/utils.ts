import { InventoryField, InventoryItem, Tag } from "@prisma/client";
import { SortingState, Updater } from "@tanstack/react-table";
import lodash from "lodash";

export function getItemValue(field: InventoryField, item: InventoryItem) {
  const key = field.type + field.slot;
  const value = item[key as keyof InventoryItem];
  return value;
}

export function resolveUpdater<T>(updaterOrValue: Updater<T>, old: T) {
  return typeof updaterOrValue === "function"
    ? (updaterOrValue as (old: T) => T)(old)
    : updaterOrValue;
}

export function sortingToQuery(state: SortingState) {
  return Object.fromEntries(state.map((s) => [s.id, s.desc ? "desc" : "asc"]));
}

export function buildCategoryInput(category?: { name: string }) {
  if (!category) return;
  const name = category.name.toLowerCase();
  return {
    connectOrCreate: {
      where: { name },
      create: { name },
    },
  };
}

export function buildTagsInput(
  currentTags: Tag[],
  newTags?: { name: string }[],
) {
  if (!newTags) return;
  const deletedTags = lodash.differenceBy(currentTags, newTags, "name");
  return {
    disconnect: deletedTags,
    connectOrCreate: newTags.map(({ name }) => ({
      where: { name },
      create: { name },
    })),
  };
}
