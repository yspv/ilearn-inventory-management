import { privateProcedure, procedure, router } from "@/trpc/trpc";
import { createInfiniteQuery } from "@/trpc/utils";
import { InventoryInputSchema } from "@zenstackhq/runtime/zod/input";
import {
  InventoryIncludeObjectSchema,
  InventoryOrderByWithRelationInputObjectSchema,
  InventoryWhereInputObjectSchema,
} from "@zenstackhq/runtime/zod/objects";
import { z } from "zod";

export const inventoryRouter = router({
  aggregate: procedure
    .input(InventoryInputSchema.aggregate)
    .query(async (opts) => {
      const { ctx, input } = opts;
      return ctx.prisma.inventory.aggregate(input);
    }),
  create: privateProcedure
    .input(InventoryInputSchema.create)
    .mutation((opts) => {
      const { ctx, input } = opts;
      return ctx.prisma.inventory.create(input);
    }),
  update: procedure
    .input(InventoryInputSchema.update)
    .mutation(async (opts) => {
      const { ctx, input } = opts;
      return ctx.prisma.inventory.update(input);
    }),
  findUnique: procedure.input(InventoryInputSchema.findUnique).query((opts) => {
    const { ctx, input } = opts;
    return ctx.prisma.inventory.findUnique(input);
  }),
  findMany: procedure
    .input(
      z.object({
        take: z.number().min(1).max(100),
        cursor: z.string().optional(),
        where: InventoryWhereInputObjectSchema.optional(),
        orderBy: InventoryOrderByWithRelationInputObjectSchema.optional(),
        include: InventoryIncludeObjectSchema.optional(),
      }),
    )
    .query(async (opts) => {
      const { input, ctx } = opts;
      return createInfiniteQuery(ctx.prisma.inventory, input);
    }),
});
