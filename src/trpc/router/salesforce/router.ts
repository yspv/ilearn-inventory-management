import { SalesForce } from "@/lib/salesforce";
import { privateProcedure, router } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const salesforceRouter = router({
  create: privateProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      try {
        const sf = await SalesForce.get();
        await sf.createContact({
          firstName: input.firstName!,
          lastName: input.lastName,
          email: input.email,
        });
      } catch (err) {
        console.log(err);
        throw new TRPCError({ code: "SERVICE_UNAVAILABLE" });
      }
    }),
});
