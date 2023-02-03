import { type inferProcedureInput } from "@trpc/server";
import { createInnerTRPCContext } from "../trpc";
import { appRouter, type AppRouter } from "../root";
import { describe, expect, test, beforeEach, afterEach, vi } from "vitest";
import { seedDatabase, flushDatabase } from "../../../../test";
import { tagData } from "../../../../test";

beforeEach(async () => {
  await seedDatabase();
});

afterEach(async () => {
  vi.restoreAllMocks();
  await flushDatabase();
});

describe("given executing the 'create' procedure of the 'notes' tRPC router", () => {
  describe("when providing valid input WITHOUT any 'tagIds' specified", () => {
    test("it should successfully create a new note WITHOUT any 'tag' associations", async () => {
      vi.mock("../trpc", async () => {
        const actual = await vi.importActual("../trpc");

        /* eslint-disable */
        return {
          // @ts-expect-error actual is definitely an object!
          ...actual,
          // @ts-expect-error actual is definitely an object!
          protectedProcedure: actual.publicProcedure, // unprotect a protected tRPC procedure
        };
        /* eslint-enable */
      });

      const ctx = createInnerTRPCContext({ session: null });
      const caller = appRouter.createCaller(ctx);

      type Input = inferProcedureInput<AppRouter["notes"]["create"]>;
      const input: Input = {
        title: "A good note",
        markdown: "What a good note!",
        tagIds: [],
      };

      const res = await caller.notes.create(input);

      expect(res).toContain({ title: input.title, markdown: input.markdown });
    });
  });

  describe("when providing valid input WITH 'tagIds' specified", () => {
    test("it should successfully create a new note WITH all 'tag' associations", async () => {
      vi.mock("../trpc", async () => {
        const actual = await vi.importActual("../trpc");

        /* eslint-disable */
        return {
          // @ts-expect-error actual is definitely an object!
          ...actual,
          // @ts-expect-error actual is definitely an object!
          protectedProcedure: actual.publicProcedure, // unprotect a protected tRPC procedure
        };
        /* eslint-enable */
      });

      const ctx = createInnerTRPCContext({ session: null });
      const caller = appRouter.createCaller(ctx);

      type Input = inferProcedureInput<AppRouter["notes"]["create"]>;
      const input: Input = {
        title: "A good note",
        markdown: "What a good note!",
        // @ts-expect-error The 'id' will always be defined!
        tagIds: [tagData[0].id, tagData[1].id],
      };

      const res = await caller.notes.create(input);

      expect(res).toContain({ title: input.title, markdown: input.markdown });
    });
  });
});
