import { privateProcedure, procedure, router } from "@/trpc/trpc";
import { createInfiniteQuery } from "@/trpc/utils";
import { InventoryInputSchema } from "@zenstackhq/runtime/zod/input";
import {
  InventoryIncludeObjectSchema,
  InventoryOrderByWithRelationInputObjectSchema,
  InventoryUpdateInputObjectSchema,
  InventoryWhereInputObjectSchema,
} from "@zenstackhq/runtime/zod/objects";
import { z } from "zod";
import { lockInventory } from "./utils";
import {
  buildNumericStats,
  buildStringStats,
  fetchAggregates,
  fetchGroupedStrings,
} from "../inventory-item/utils";

export const inventoryRouter = router({
  stats: procedure.input(z.object({ id: z.string() })).query(async (opts) => {
    const { ctx, input } = opts;

    const fields = await ctx.prisma.inventoryField.findMany({
      where: { inventoryId: input.id },
    });

    const aggResult = await fetchAggregates(ctx, input.id, fields);
    const groupResults = await fetchGroupedStrings(ctx, input.id, fields);
    const numerics = buildNumericStats(fields, aggResult);
    const strings = buildStringStats(fields, groupResults);

    return {
      total: aggResult._count,
      strings: strings,
      numeric: numerics,
    };
  }),
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
    .input(
      z.object({
        id: z.string(),
        version: z.number(),
        data: InventoryUpdateInputObjectSchema,
      }),
    )
    .mutation(async (opts) => {
      const { ctx, input } = opts;
      return ctx.prisma.$transaction(async (tx) => {
        const version = await lockInventory({
          tx: tx as any,
          id: input.id,
          version: input.version,
        });
        return tx.inventory.update({
          where: { id: input.id },
          data: { ...input.data, version },
        });
      });
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
