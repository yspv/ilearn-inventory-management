import z from "zod";

export const ItemInput = z.object({
  string1: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
  string2: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
  string3: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
  boolean1: z
    .boolean()
    .nullish()
    .transform((x) => x ?? undefined),
  boolean2: z
    .boolean()
    .nullish()
    .transform((x) => x ?? undefined),
  boolean3: z
    .boolean()
    .nullish()
    .transform((x) => x ?? undefined),
  mlText1: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
  mlText2: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
  mlText3: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
  num1: z
    .number()
    .nullish()
    .transform((x) => x ?? undefined),
  num2: z
    .number()
    .nullish()
    .transform((x) => x ?? undefined),
  num3: z
    .number()
    .nullish()
    .transform((x) => x ?? undefined),
  link1: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
  link2: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
  link3: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
});
