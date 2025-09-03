import { privateProcedure, procedure, router } from "@/trpc/trpc";
import { createInfiniteQuery } from "@/trpc/utils";
import { InventoryItemInputSchema } from "@zenstackhq/runtime/zod/input";
import {
  InventoryItemOrderByRelationAggregateInputObjectSchema,
  InventoryItemWhereInputObjectSchema,
} from "@zenstackhq/runtime/zod/objects";
import { z } from "zod";
import { Generator } from "../custom-id-field/generator";
import { ItemInput } from "./schema";

export const inventoryItemRouter = router({
  groupBy: procedure.input(InventoryItemInputSchema.groupBy).query((opts) => {
    const { ctx, input } = opts;
    return ctx.prisma.inventoryItem.groupBy(input as any);
  }),
  aggregate: procedure
    .input(InventoryItemInputSchema.aggregate)
    .query((opts) => {
      const { ctx, input } = opts;
      return ctx.prisma.inventoryItem.aggregate(input);
    }),
  create: privateProcedure
    .input(
      z.object({
        inventoryId: z.string(),
        data: ItemInput,
      }),
    )
    .mutation(async (opts) => {
      const { ctx, input } = opts;
      const { inventoryId, data } = input;
      const customIdFields = await ctx.prisma.customIdField.findMany({
        where: { inventoryId },
      });
      const lastItem = await ctx.prisma.inventoryItem.findFirst({
        where: { inventoryId },
        orderBy: { sequnce: "desc" },
      });
      const last = lastItem?.sequnce || 0;
      const generator = new Generator(last);
      const customId = generator.generate(customIdFields);
      return ctx.prisma.inventoryItem.create({
        data: {
          ...data,
          ownerId: ctx.user!.id,
          inventoryId,
          customId,
          sequnce: last + 1,
        },
      });
    }),
  update: procedure
    .input(InventoryItemInputSchema.update)
    .mutation(async (opts) => {
      const { ctx, input } = opts;
      return ctx.prisma.inventoryItem.update(input);
    }),
  findUnique: procedure
    .input(InventoryItemInputSchema.findUnique)
    .query(async (opts) => {
      const { ctx, input } = opts;
      return ctx.prisma.inventoryItem.findUnique(input);
    }),
  findMany: procedure
    .input(
      z.object({
        take: z.number(),
        cursor: z.string().optional(),
        where: InventoryItemWhereInputObjectSchema.optional(),
        orderBy:
          InventoryItemOrderByRelationAggregateInputObjectSchema.optional(),
      }),
    )
    .query(async (opts) => {
      const { ctx, input } = opts;
      return createInfiniteQuery(ctx.prisma.inventoryItem, input);
    }),
});
