import { createTRPCRouter } from "./trpc";
import { tagRouter } from "./routers/tag";
import { noteRouter } from "./routers/note";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  note: noteRouter,
  tag: tagRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
