import { formatDate } from "@/utilts/date";
import { random20bit, random32bit } from "@/utilts/random";
import React from "react";

interface CustomIdField {
  id: number;
  type: string;
  format: string;
}

function parseFormat(format: string) {
  const match = format.match(/\[(.*?)\]/);
  return match ? match[1] : null;
}

function format(value: any, format: string) {
  return format.replace(/\[(.*?)\]/, value);
}

function convertToHex(num: number) {
  return num.toString(16);
}

function convertToDigit(num: number) {
  return num.toString(10);
}

function formaNumber(num: number, format: string) {
  const [to] = format.split(":");
  switch (to) {
    case "X": {
      return convertToHex(num);
    }
    case "D": {
      return convertToDigit(num);
    }
  }
}

function generator(type: string, format: string | null) {
  switch (type) {
    case "fixed":
      return format;
    case "datetime":
      return formatDate(new Date(), format || "");
    case "32bit": {
      const num = random32bit();
      return format ? formaNumber(num, format) : num;
    }
    case "20bit": {
      const num = random20bit();
      return format ? formaNumber(num, format) : num;
    }
    default:
      return Math.floor(Math.random() * 100_000);
  }
}

export function useCustomId() {
  const [fields, setFields] = React.useState<
    { id: number; type: string; format: string }[]
  >([]);

  const updateField = (field: CustomIdField) => {
    setFields((prevFields) =>
      prevFields.map((f) => (f.id === field.id ? { ...field } : f)),
    );
  };

  const addField = (input: { type: string; format: string }) => {
    setFields([...fields, { id: fields.length + 1, ...input }]);
  };

  const deleteField = (id: number) => {
    setFields((prevFields) =>
      prevFields
        .filter((prev) => prev.id !== id)
        .map((prev, i) => ({ ...prev, id: i })),
    );
  };

  function getExample() {
    return fields.reduce(
      (str, f) =>
        str + format(generator(f.type, parseFormat(f.format)), f.format),
      "",
    );
  }

  return { fields, addField, updateField, setFields, deleteField, getExample };
}
