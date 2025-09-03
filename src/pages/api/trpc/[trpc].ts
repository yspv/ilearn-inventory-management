import { createContext } from "@/trpc/context";
import { appRouter } from "@/trpc/router/_app";
import { createNextApiHandler } from "@trpc/server/adapters/next";

export default createNextApiHandler({
  router: appRouter,
  createContext
})