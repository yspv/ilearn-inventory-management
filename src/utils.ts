import { InventoryField, InventoryItem } from "@prisma/client";
import { SortingState, Updater } from "@tanstack/react-table";

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
