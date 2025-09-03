import { privateProcedure, procedure, router } from "@/trpc/trpc";
import { createInfiniteQuery } from "@/trpc/utils";
import {
  InventoryCommentIncludeObjectSchema,
  InventoryCommentOrderByWithRelationInputObjectSchema,
  InventoryCommentWhereInputObjectSchema,
} from "@zenstackhq/runtime/zod/objects";
import z from "zod";

export const inventoryCommentRouter = router({
  create: privateProcedure
    .input(z.object({ inventoryId: z.string(), comment: z.string() }))
    .mutation(async (opts) => {
      const { ctx, input } = opts;

      return ctx.prisma.inventoryComment.create({
        data: {
          userId: ctx.user!.id,
          inventoryId: input.inventoryId,
          comment: input.comment,
        },
      });
    }),
  findMany: procedure
    .input(
      z.object({
        take: z.number().int().min(1).max(100),
        cursor: z.string().optional(),
        where: InventoryCommentWhereInputObjectSchema.optional(),
        orderBy:
          InventoryCommentOrderByWithRelationInputObjectSchema.optional(),
        include: InventoryCommentIncludeObjectSchema.optional(),
      }),
    )
    .query(async (opts) => {
      const { ctx, input } = opts;
      return createInfiniteQuery(ctx.prisma.inventoryComment, input);
    }),
});
