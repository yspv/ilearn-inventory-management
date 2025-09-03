import z from "zod";

export const InventoryCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1).toLowerCase(),
  tags: z.array(z.string()),
  isPrivate: z.boolean(),
});

export type InventoryCreateType = z.infer<typeof InventoryCreateSchema>;
