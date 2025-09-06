import z from "zod";
import { TRPC_ERROR_CODE_KEY, TRPCError } from "@trpc/server";
import { isPrismaClientKnownRequestError } from "@zenstackhq/runtime";

export interface InfiniteQuery<T> {
  items: T[];
  nextCursor: string | null;
}

const PRISMA_ERROR_MAP: Record<string, TRPC_ERROR_CODE_KEY> = {
  P2004: "FORBIDDEN",
  P2025: "NOT_FOUND",
};

export async function createInfiniteQuery<T>(
  prismaDelegate: {
    findMany: (args: any) => Promise<T[]>;
  },
  args: {
    take: number;
    cursor?: string;
    orderBy?: any;
    where?: any;
    include?: any;
  },
): Promise<InfiniteQuery<T>> {
  const { take, cursor, orderBy, where, include } = args;
  const items = await prismaDelegate.findMany({
    take: take + 1,
    where,
    orderBy: orderBy || { id: "desc" },
    cursor: cursor ? { ["id"]: cursor } : undefined,
    skip: cursor ? 1 : 0,
    include,
  });

  let nextCursor: string | null = null;
  if (items.length > take) {
    const nextItem = items.pop();
    nextCursor = (nextItem as any)["id"];
  }

  return {
    items,
    nextCursor,
  };
}

export const InfiniteQuerySchema = z.object({
  take: z.number().int().min(1).max(100),
  cursor: z.string().optional(),
});

export async function checkPrismaError<T>(promise: Promise<T>): Promise<T> {
  try {
    return await promise;
  } catch (err: any) {
    if (isPrismaClientKnownRequestError(err)) {
      const code = PRISMA_ERROR_MAP[err.code] ?? "BAD_REQUEST";
      throw new TRPCError({
        code,
        message: err.message,
        cause: err,
      });
    }
    throw err;
  }
}
