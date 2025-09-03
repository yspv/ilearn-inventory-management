import { inferRouterInputs } from "@trpc/server";
import { router } from "../trpc";
import { inventoryRouter } from "./inventory/router";
import { customIdFieldRouter } from "./custom-id-field/router";
import { inventoryFieldRouter } from "./inventory-field/router";
import { userRouter } from "./user/router";
import { inventoryItemRouter } from "./inventory-item/router";
import { inventoryCommentRouter } from "./inventory-comment/router";

export const appRouter = router({
  user: userRouter,
  inventory: inventoryRouter,
  inventoryItem: inventoryItemRouter,
  customIdField: customIdFieldRouter,
  inventoryField: inventoryFieldRouter,
  inventoryComment: inventoryCommentRouter,
});
export type AppRouter = typeof appRouter;
export type AppRouterInput = inferRouterInputs<AppRouter>;
