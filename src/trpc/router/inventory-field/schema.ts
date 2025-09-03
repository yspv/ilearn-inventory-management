import { z } from "zod";

export const InventoryFieldsInputSchema = z.array(
  z.object({
    type: z.enum(["string", "mlText", "num", "link", "boolean"]),
    title: z.string().min(1),
    description: z.string().min(1),
    isVisible: z.boolean(),
    required: z.boolean(),
    orderIndex: z.number(),
  }),
);
