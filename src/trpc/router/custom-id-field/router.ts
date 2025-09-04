import { procedure, router } from "@/trpc/trpc";
import { z } from "zod";
import { Generator } from "./generator";
import { lockInventory } from "../inventory/utils";
import { CustomIdReorderSchema } from "./schema";

export const customIdFieldRouter = router({
  findManyByInventoryId: procedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const { ctx, input } = opts;
      const generator = new Generator(10);
      const inventory = await ctx.prisma.inventory.findUnique({
        where: { id: input.id },
        include: { customIdFields: true },
      });
      if (!inventory) return;
      const fields = inventory.customIdFields;
      return {
        id: generator.generate(fields.sort((a, b) => a.order - b.order)),
        version: inventory?.version,
        fields,
      };
    }),
  reorder: procedure
    .input(
      z.object({
        id: z.string(),
        version: z.number(),
        fields: CustomIdReorderSchema,
      }),
    )
    .mutation(async (opts) => {
      const { ctx, input } = opts;
      const generator = new Generator(10);
      return ctx.prisma.$transaction(async (tx) => {
        const version = await lockInventory({
          tx: tx as any,
          id: input.id,
          version: input.version,
        });
        await tx.customIdField.deleteMany({ where: { inventoryId: input.id } });
        const fields = await tx.customIdField.createManyAndReturn({
          data: input.fields.map((f) => ({ ...f, inventoryId: input.id })),
        });
        return {
          id: generator.generate(fields.sort((a, b) => a.order - b.order)),
          fields,
          version,
        };
      });
    }),
});
