import { procedure, router } from "@/trpc/trpc";
import { z } from "zod";
import { Generator } from "./generator";

export const customIdFieldRouter = router({
  findManyByInventoryId: procedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const { ctx, input } = opts;
      const generator = new Generator(10);
      const fields = await ctx.prisma.customIdField.findMany({
        where: { inventoryId: input.id },
      });
      return {
        id: generator.generate(fields.sort((a, b) => a.order - b.order)),
        fields,
      };
    }),
  update: procedure
    .input(
      z.object({
        id: z.string(),
        fields: z.array(
          z.object({
            type: z.string(),
            format: z.string(),
            order: z.number(),
          }),
        ),
      }),
    )
    .mutation(async (opts) => {
      const { ctx, input } = opts;
      const generator = new Generator(10);
      return ctx.prisma.$transaction(async (tx) => {
        await tx.customIdField.deleteMany({ where: { inventoryId: input.id } });
        const fields = await tx.customIdField.createManyAndReturn({
          data: input.fields.map((f) => ({ ...f, inventoryId: input.id })),
        });
        return {
          id: generator.generate(fields.sort((a, b) => a.order - b.order)),
          fields,
        };
      });
    }),
});
