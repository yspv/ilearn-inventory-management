import dayjs from "dayjs";

export function formatDate(date: Date, format: string) {
  return dayjs(date).format(format);
}
