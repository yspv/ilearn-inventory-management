import { router, procedure } from "@/trpc/trpc";
import lodash from "lodash";
import { z } from "zod";
import { InventoryFieldsInputSchema } from "./schema";
import { lockInventory } from "../inventory/utils";

export const inventoryFieldRouter = router({
  findManyByInventoryId: procedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const { ctx, input } = opts;
      const inventory = await ctx.prisma.inventory.findUnique({
        where: { id: input.id },
        include: { fields: true },
      });
      if (!inventory) return;
      return {
        version: inventory.version,
        fields: inventory.fields,
      };
    }),
  manage: procedure
    .input(
      z.object({
        id: z.string(),
        version: z.number(),
        fields: InventoryFieldsInputSchema,
      }),
    )
    .mutation(async (opts) => {
      const { ctx, input } = opts;
      const fieldSlots = lodash.countBy(input.fields, "type");

      const fields = input.fields.map((f) => {
        const slot = fieldSlots[f.type]--;
        return { ...f, slot, inventoryId: input.id };
      });

      return ctx.prisma.$transaction(async (tx) => {
        const version = await lockInventory({
          tx: tx as any,
          id: input.id,
          version: input.version,
        });

        await tx.inventoryField.deleteMany({
          where: { inventoryId: input.id },
        });

        const { count } = await tx.inventoryField.createMany({ data: fields });
        return {
          version,
          count,
        };
      });
    }),
});
