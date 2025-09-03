import { router, procedure } from "@/trpc/trpc";
import lodash from "lodash";
import { z } from "zod";
import { InventoryFieldsInputSchema } from "./schema";

export const inventoryFieldRouter = router({
  findManyByInventoryId: procedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const { ctx, input } = opts;
      return ctx.prisma.inventoryField.findMany({
        where: { inventoryId: input.id },
      });
    }),
  manage: procedure
    .input(z.object({ id: z.string(), fields: InventoryFieldsInputSchema }))
    .mutation(async (opts) => {
      const { ctx, input } = opts;
      const fieldSlots = lodash.countBy(input.fields, "type");
      const foo = input.fields.map((f) => {
        const slot = fieldSlots[f.type]--;
        return { ...f, slot, inventoryId: input.id };
      });
      return ctx.prisma.$transaction(async (tx) => {
        await tx.inventoryField.deleteMany({
          where: { inventoryId: input.id },
        });
        return tx.inventoryField.createManyAndReturn({ data: foo });
      });
    }),
});
