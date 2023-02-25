import { prisma } from "../../db";
import { createInnerTRPCContext } from "../trpc";
import { appRouter, type AppRouter } from "../root";
import { type inferProcedureInput } from "@trpc/server";
import { seedDatabase, flushDatabase } from "../../../../test";
import { dummyUUID, noteData, tagData } from "../../../../test";
import { describe, expect, test, beforeEach, afterEach, vi } from "vitest";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("given executing the 'create' procedure of the 'note' tRPC router", () => {
  describe("when providing valid input WITHOUT any 'tagIds' specified", () => {
    test("it should successfully create a new note WITHOUT any 'tag' relations", async () => {
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

      type Input = inferProcedureInput<AppRouter["note"]["create"]>;
      const input: Input = {
        title: "A good note",
        markdown: "What a good note!",
        tagIds: [],
      };

      const res = await caller.note.create(input);

      expect(res).toContain({ title: input.title, markdown: input.markdown });
      expect(res.tags.length).toEqual(0);
    });
  });

  describe("when providing valid input WITH 'tagIds' specified", () => {
    beforeEach(async () => {
      await seedDatabase();
    });

    afterEach(async () => {
      await flushDatabase();
    });

    test("it should successfully create a new note WITH all 'tag' relations", async () => {
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

      type Input = inferProcedureInput<AppRouter["note"]["create"]>;
      const input: Input = {
        title: "A good note",
        markdown: "What a good note!",
        // @ts-expect-error The 'id' will always be defined!
        tagIds: [tagData[0].id, tagData[1].id],
      };

      const res = await caller.note.create(input);

      expect(res).toContain({ title: input.title, markdown: input.markdown });
      expect(res.tags.length).toEqual(2);
      expect(res.tags[0]).toContain(tagData[0]);
      expect(res.tags[1]).toContain(tagData[1]);
    });
  });

  describe("when providing valid input WITH INVALID 'tagIds' specified", () => {
    beforeEach(async () => {
      await seedDatabase();
    });

    afterEach(async () => {
      await flushDatabase();
    });

    test("it should fail gracefully with an appropriate error message", async () => {
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

      type Input = inferProcedureInput<AppRouter["note"]["create"]>;
      const input: Input = {
        title: "A good note",
        markdown: "What a good note!",
        // @ts-expect-error The 'id' will always be defined!
        tagIds: [dummyUUID, tagData[1].id],
      };

      await expect(caller.note.create(input)).rejects.toThrow("An unexpected error occurred!");
    });
  });
});

describe("given executing the 'get' procedure of the 'note' tRPC router", () => {
  beforeEach(async () => {
    await seedDatabase();
  });

  afterEach(async () => {
    await flushDatabase();
  });

  describe("when providing valid note ID and specifying NOT to include related tags", () => {
    test("it should successfully retrieve the correct note WITHOUT any tags included in the response", async () => {
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

      type Input = inferProcedureInput<AppRouter["note"]["get"]>;
      const input: Input = {
        id: noteData[1]?.id as string,
        includeRelations: false,
      };

      const res = await caller.note.get(input);

      expect(res).toContain(noteData[1]);
      expect(res.tags.length).toEqual(0);
    });
  });

  describe("when providing valid note ID and specifying to INCLUDE related tags", () => {
    test("it should successfully retrieve the correct note WITH any tags INCLUDED in the response", async () => {
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

      type Input = inferProcedureInput<AppRouter["note"]["get"]>;
      const input: Input = {
        id: noteData[1]?.id as string,
        includeRelations: true,
      };

      const res = await caller.note.get(input);

      expect(res).toContain(noteData[1]);
      expect(res.tags.length).toEqual(1);
      expect(res.tags[0]).toContain(tagData[1]);
    });
  });

  describe("when providing an INVALID note ID", () => {
    test("it should fail gracefully with an appropriate error message", async () => {
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

      type Input = inferProcedureInput<AppRouter["note"]["get"]>;
      const input: Input = {
        id: dummyUUID,
        includeRelations: false,
      };

      await expect(caller.note.get(input)).rejects.toThrow("An unexpected error occurred!");
    });
  });
});

describe("given executing the 'getAll' procedure of the 'note' tRPC router", () => {
  beforeEach(async () => {
    await seedDatabase();
  });

  afterEach(async () => {
    await flushDatabase();
  });

  describe("when multiple valid notes exist in the database and specifying NOT to include related tags", () => {
    test("it should successfully retrieve all the notes WITHOUT any tags included in the response", async () => {
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

      const res = await caller.note.getAll({ includeRelations: false });

      expect(res.length).toEqual(6);

      noteData.forEach((noteDatum, index) => {
        expect(res[index]).toContain(noteDatum);
        expect(res[index]?.tags.length).toEqual(0);
      });
    });
  });

  describe("when multiple valid notes exist in the database and specifying to INCLUDE related tags", () => {
    test("it should successfully retrieve all the notes WITH any tags INCLUDED in the response", async () => {
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

      const res = await caller.note.getAll();

      expect(res.length).toEqual(6);

      noteData.forEach((noteDatum, index) => {
        expect(res[index]).toContain(noteDatum);
        expect(res[index]?.tags.length).toEqual(1);
        expect(res[index]?.tags[0]).toContain(tagData[index]);
      });
    });
  });
});

describe("given executing the 'update' procedure of the 'note' tRPC router", () => {
  beforeEach(async () => {
    await seedDatabase();
  });

  afterEach(async () => {
    await flushDatabase();
  });

  describe("when providing valid input WITHOUT any 'tagIds' specified", () => {
    test("it should successfully update an existing note WITHOUT changing 'tag' relations", async () => {
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

      type Input = inferProcedureInput<AppRouter["note"]["update"]>;
      const input: Input = {
        id: noteData[0]?.id as string,
        title: "An updated note",
        markdown: "What a nice updated note!",
      };

      const res = await caller.note.update(input);

      expect(res).toContain({ title: input.title, markdown: input.markdown });
      expect(res.tags.length).toEqual(1);
      expect(res.tags[0]).toContain(tagData[0]);
    });
  });

  describe("when providing PARTIAL valid input WITHOUT any 'tagIds' specified", () => {
    test("it should successfully update an existing note WITHOUT changing 'tag' relations", async () => {
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

      type Input = inferProcedureInput<AppRouter["note"]["update"]>;
      const input: Input = {
        id: noteData[0]?.id as string,
        title: "An updated note",
      };

      const res = await caller.note.update(input);

      expect(res).toContain({ title: input.title, markdown: noteData[0]?.markdown });
      expect(res.tags.length).toEqual(1);
      expect(res.tags[0]).toContain(tagData[0]);
    });
  });

  describe("when providing valid input WITH 'tagIds' specified", () => {
    test("it should successfully create a new note WITH all 'tag' relations", async () => {
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

      type Input = inferProcedureInput<AppRouter["note"]["update"]>;
      const input: Input = {
        id: noteData[0]?.id as string,
        title: "Update this note!",
        markdown: "Look at this awesome updated note!",
        // @ts-expect-error The 'id' will always be defined!
        tagIds: [tagData[0].id, tagData[1].id, tagData[2].id],
      };

      const res = await caller.note.update(input);

      expect(res).toContain({ title: input.title, markdown: input.markdown });
      expect(res.tags.length).toEqual(3);
      expect(res.tags[0]).toContain(tagData[0]);
      expect(res.tags[1]).toContain(tagData[1]);
      expect(res.tags[2]).toContain(tagData[2]);
    });
  });

  describe("when providing an INVALID note ID", () => {
    test("it should fail gracefully with an appropriate error message", async () => {
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

      type Input = inferProcedureInput<AppRouter["note"]["update"]>;
      const input: Input = {
        id: dummyUUID,
        title: "This will never be updated!",
        markdown: "Look, it didn't happen!",
      };

      await expect(caller.note.update(input)).rejects.toThrow("An unexpected error occurred!");
    });
  });

  describe("when providing valid input WITH INVALID 'tagIds' specified", () => {
    test("it should fail gracefully with an appropriate error message", async () => {
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

      type Input = inferProcedureInput<AppRouter["note"]["update"]>;
      const input: Input = {
        id: noteData[0]?.id as string,
        title: "Update this note!",
        markdown: "Look at this awesome updated note!",
        // @ts-expect-error The 'id' will always be defined!
        tagIds: [dummyUUID, tagData[1].id],
      };

      await expect(caller.note.update(input)).rejects.toThrow("An unexpected error occurred!");
    });
  });
});

describe("given executing the 'delete' procedure of the 'note' tRPC router", () => {
  beforeEach(async () => {
    await seedDatabase();
  });

  afterEach(async () => {
    await flushDatabase();
  });

  describe("when providing valid note ID", () => {
    test("it should successfully delete the record", async () => {
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

      type Input = inferProcedureInput<AppRouter["note"]["delete"]>;
      const input: Input = {
        id: noteData[1]?.id as string,
      };

      await caller.note.delete(input);

      expect(await prisma.note.count({ where: { id: noteData[1]?.id as string } })).toEqual(0);
      expect(await prisma.tagsOnNotes.count({ where: { noteId: noteData[1]?.id as string } })).toEqual(0);
    });
  });

  describe("when providing an INVALID note ID", () => {
    test("it should fail gracefully with an appropriate error message", async () => {
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

      type Input = inferProcedureInput<AppRouter["note"]["delete"]>;
      const input: Input = {
        id: dummyUUID,
      };

      await expect(caller.note.delete(input)).rejects.toThrow("An unexpected error occurred!");
    });
  });
});
