import { procedure, router } from "@/trpc/trpc";
import { createInfiniteQuery } from "@/trpc/utils";
import {
  UserIncludeObjectSchema,
  UserOrderByWithRelationInputObjectSchema,
  UserWhereInputObjectSchema,
} from "@zenstackhq/runtime/zod/objects";
import { z } from "zod";

export const userRouter = router({
  findMany: procedure
    .input(
      z.object({
        take: z.number().min(1).max(100),
        cursor: z.string().optional(),
        where: UserWhereInputObjectSchema.optional(),
        orderBy: UserOrderByWithRelationInputObjectSchema.optional(),
        include: UserIncludeObjectSchema.optional(),
      }),
    )
    .query(async (opts) => {
      const { ctx, input } = opts;
      return createInfiniteQuery(ctx.prisma.user, input);
    }),
});
