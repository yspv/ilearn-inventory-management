import z from "zod";
export const schema = z.object({
  type: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  isVisible: z.boolean().default(false),
  required: z.boolean().default(true),
});
