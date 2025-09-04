import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export async function lockInventory(props: {
  tx: Prisma.TransactionClient;
  id: string;
  version: number;
}) {
  const { tx, id, version } = props;
  const { count } = await tx.inventory.updateMany({
    where: { id, version },
    data: { version: { increment: 1 } },
  });
  if (count === 0) {
    throw new TRPCError({
      code: "CONFLICT",
      message: "Version conflict",
    });
  }
  return version + 1;
}
