export function groupArrayToObject<T>(
  arr: Array<Array<Record<string, T>>>,
): Record<string, T[]> {
  return arr.reduce(
    (acc, group) => {
      const key = Object.keys(group[0])[0];
      const values = group.map((obj) => Object.values(obj)[0] as T);
      acc[key] = values;
      return acc;
    },
    {} as Record<string, T[]>,
  );
}
