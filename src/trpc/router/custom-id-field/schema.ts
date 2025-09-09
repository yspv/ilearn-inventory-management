import { z } from "zod";
import { CUSTOM_ID_UNIQUE_TYPES } from "./utils";

const datetimeSchema = z.object({
  type: z.literal("datetime"),
  format: z.string().regex(/\[(YYYY-MM-DD|YYYY-MM|YYYY)\]/, "datetime"),
  order: z.number().int(),
});

const fixedSchema = z.object({
  type: z.literal("fixed"),
  format: z.string().min(1, "fixed"),
  order: z.number().int(),
});

const bit32Schema = z.object({
  type: z.literal("bit32"),
  format: z.string().regex(/\[(D:10|X:8)\]/, "bit32"),
  order: z.number().int(),
});

const bit20Schema = z.object({
  type: z.literal("bit20"),
  format: z.string().regex(/\[(D:7|X:5)\]/, "bit20"),
  order: z.number().int(),
});

const sequence = z.object({
  type: z.literal("sequence"),
  format: z.string().regex(/\[D:[0-9]\]/, "sequence"),
  order: z.number().int(),
});

const digit6Schema = z.object({
  type: z.literal("digit6"),
  format: z.string().regex(/\[D:[0-9]\]/, "digit6"),
  order: z.number().int(),
});

const digit9Schema = z.object({
  type: z.literal("digit9"),
  format: z.string().regex(/\[D:[0-9]\]/, "digit9"),
  order: z.number().int(),
});

const guidSchema = z.object({
  type: z.literal("guid"),
  format: z.string().regex(/\[G\]/, "guid"),
  order: z.number().int(),
});

export const fieldSchema = z.discriminatedUnion("type", [
  datetimeSchema,
  fixedSchema,
  bit32Schema,
  bit20Schema,
  digit6Schema,
  digit9Schema,
  sequence,
  guidSchema,
]);

export const CustomIdReorderSchema = z
  .array(fieldSchema)
  .max(10, "field-limit")
  .refine(
    (fields) =>
      fields.some((f) => CUSTOM_ID_UNIQUE_TYPES.includes(f.type as any)),
    "unique-error",
  );
