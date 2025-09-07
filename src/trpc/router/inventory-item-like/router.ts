import { privateProcedure, router } from "@/trpc/trpc";
import { checkPrismaError } from "@/trpc/utils";
import z from "zod";

export const inventoryItemLikeRouter = router({
  like: privateProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { ctx, input } = opts;
      const { user } = ctx;
      const id = { itemId: input.id, userId: user!.id };
      const exists = await ctx.prisma.inventoryItemLike.findUnique({
        where: { userId_itemId: id },
      });
      return ctx.prisma.$transaction(async (tx) => {
        if (exists) {
          await checkPrismaError(
            tx.inventoryItemLike.delete({ where: { userId_itemId: id } }),
          );
          return { liked: false };
        } else {
          await checkPrismaError(tx.inventoryItemLike.create({ data: id }));
          return { liked: true };
        }
      });
    }),
});
