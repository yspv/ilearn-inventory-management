import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { enhance } from "@zenstackhq/runtime";

export async function createContext({ req, res }: CreateNextContextOptions) {
  const authObj = await auth(req, res);
  return {
    user: authObj?.user,
    prisma: enhance(prisma, { user: authObj?.user }),
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
