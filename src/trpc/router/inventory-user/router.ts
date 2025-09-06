import { privateProcedure, router } from "@/trpc/trpc";
import { InventoryUserInputSchema } from "@zenstackhq/runtime/zod/input";

export const inventoryUserRouter = router({
  deleteMany: privateProcedure
    .input(InventoryUserInputSchema.deleteMany)
    .mutation((opts) => {
      const { ctx, input } = opts;
      return ctx.prisma.inventoryUser.deleteMany(input);
    }),
  createMany: privateProcedure
    .input(InventoryUserInputSchema.createMany)
    .mutation((opts) => {
      const { ctx, input } = opts;
      return ctx.prisma.inventoryUser.createMany(input);
    }),
});
