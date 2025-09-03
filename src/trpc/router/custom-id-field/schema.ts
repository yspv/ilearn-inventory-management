import { z } from "zod";

const datetimeSchema = z.object({
  type: z.literal("datetime"),
  format: z.string().regex(/\[YYYY\]/, "datetime"),
});

const fixedSchema = z.object({
  type: z.literal("fixed"),
  format: z.string().min(1, "fixed"),
});

const bit32Schema = z.object({
  type: z.literal("bit32"),
  format: z.string().regex(/\[D:9|X:7\]/, "bit32"),
});

const bit20Schema = z.object({
  type: z.literal("bit20"),
  format: z.string().regex(/\[D:6|X:5\]/, "bit20"),
});

const sequence = z.object({
  type: z.literal("sequence"),
  format: z.string().regex(/\[D:[0-9]\]/, "sequence"),
});

const digit6Schema = z.object({
  type: z.literal("digit6"),
  format: z.string().regex(/[]/, "digit6"),
});

const digit9Schema = z.object({
  type: z.literal("digit9"),
  format: z.string().regex(/[]/, "digit9"),
});

const guidSchema = z.object({
  type: z.literal("guid"),
  format: z.string().regex(/\[G\]/, "guid"),
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

export const schema = z.array(fieldSchema).max(10, "field-limit");
