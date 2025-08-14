import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { enhance } from "@zenstackhq/runtime";
import { NextRequestHandler } from "@zenstackhq/server/next";

async function getPrisma() {
  const authObj = await auth();
  return enhance(prisma, { user: authObj?.user });
}

const handler = NextRequestHandler({ getPrisma, useAppDir: true });
export {
  handler as DELETE,
  handler as GET,
  handler as PATH,
  handler as POST,
  handler as PUT,
};
