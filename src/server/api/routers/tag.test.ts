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

describe("given executing the 'create' procedure of the 'tag' tRPC router", () => {
  describe("when providing valid input WITHOUT any 'noteIds' specified", () => {
    test("it should successfully create a new tag WITHOUT any 'note' relations", async () => {
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

      type Input = inferProcedureInput<AppRouter["tag"]["create"]>;
      const input: Input = {
        label: "A fun new tag for the whole family!",
        noteIds: [],
      };

      const res = await caller.tag.create(input);

      expect(res).toContain({ label: input.label });
      expect(res.notes.length).toEqual(0);
    });
  });

  describe("when providing valid input WITH 'noteIds' specified", () => {
    beforeEach(async () => {
      await seedDatabase();
    });

    afterEach(async () => {
      await flushDatabase();
    });

    test("it should successfully create a new tag WITH all 'tag' relations", async () => {
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

      type Input = inferProcedureInput<AppRouter["tag"]["create"]>;
      const input: Input = {
        label: "This tag has notes!",
        // @ts-expect-error The 'id' will always be defined!
        noteIds: [noteData[0].id, noteData[1].id],
      };

      const res = await caller.tag.create(input);

      expect(res).toContain({ label: input.label });
      expect(res.notes.length).toEqual(2);
      expect(res.notes[0]).toContain(noteData[0]);
      expect(res.notes[1]).toContain(noteData[1]);
    });
  });

  describe("when providing valid input WITH INVALID 'noteIds' specified", () => {
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

      type Input = inferProcedureInput<AppRouter["tag"]["create"]>;
      const input: Input = {
        label: "Oh no! This will make things sad!",
        // @ts-expect-error The 'id' will always be defined!
        noteIds: [dummyUUID, noteData[1].id],
      };

      await expect(caller.tag.create(input)).rejects.toThrow("An unexpected error occurred!");
    });
  });
});

describe("given executing the 'get' procedure of the 'tag' tRPC router", () => {
  beforeEach(async () => {
    await seedDatabase();
  });

  afterEach(async () => {
    await flushDatabase();
  });

  describe("when providing valid tag ID and specifying NOT to include related notes", () => {
    test("it should successfully retrieve the correct tag WITHOUT any notes included in the response", async () => {
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

      type Input = inferProcedureInput<AppRouter["tag"]["get"]>;
      const input: Input = {
        id: tagData[1]?.id as string,
        includeRelations: false,
      };

      const res = await caller.tag.get(input);

      expect(res).toContain(tagData[1]);
      expect(res.notes.length).toEqual(0);
    });
  });

  describe("when providing valid tag ID and specifying to INCLUDE related notes", () => {
    test("it should successfully retrieve the correct tag WITH any notes INCLUDED in the response", async () => {
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

      type Input = inferProcedureInput<AppRouter["tag"]["get"]>;
      const input: Input = {
        id: tagData[1]?.id as string,
        includeRelations: true,
      };

      const res = await caller.tag.get(input);

      expect(res).toContain(tagData[1]);
      expect(res.notes.length).toEqual(1);
      expect(res.notes[0]).toContain(noteData[1]);
    });
  });

  describe("when providing an INVALID tag ID", () => {
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

      type Input = inferProcedureInput<AppRouter["tag"]["get"]>;
      const input: Input = {
        id: dummyUUID,
        includeRelations: false,
      };

      await expect(caller.tag.get(input)).rejects.toThrow("An unexpected error occurred!");
    });
  });
});

describe("given executing the 'getAll' procedure of the 'tag' tRPC router", () => {
  beforeEach(async () => {
    await seedDatabase();
  });

  afterEach(async () => {
    await flushDatabase();
  });

  describe("when multiple valid tags exist in the database and specifying NOT to include related notes", () => {
    test("it should successfully retrieve all the tags WITHOUT any notes included in the response", async () => {
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

      const res = await caller.tag.getAll({ includeRelations: false });

      expect(res.length).toEqual(6);

      tagData.forEach((tagDatum, index) => {
        expect(res[index]).toContain(tagDatum);
        expect(res[index]?.notes.length).toEqual(0);
      });
    });
  });

  describe("when multiple valid tags exist in the database and specifying to INCLUDE related notes", () => {
    test("it should successfully retrieve all the tags WITH any notes INCLUDED in the response", async () => {
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

      const res = await caller.tag.getAll();

      expect(res.length).toEqual(6);

      tagData.forEach((tagDatum, index) => {
        expect(res[index]).toContain(tagDatum);
        expect(res[index]?.notes.length).toEqual(1);
        expect(res[index]?.notes[0]).toContain(noteData[index]);
      });
    });
  });
});

describe("given executing the 'update' procedure of the 'tag' tRPC router", () => {
  beforeEach(async () => {
    await seedDatabase();
  });

  afterEach(async () => {
    await flushDatabase();
  });

  describe("when providing valid input WITHOUT any 'noteIds' specified", () => {
    test("it should successfully update an existing tag WITHOUT changing 'note' relations", async () => {
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

      type Input = inferProcedureInput<AppRouter["tag"]["update"]>;
      const input: Input = {
        id: tagData[0]?.id as string,
        label: "A fresh new label for the season!",
      };

      const res = await caller.tag.update(input);

      expect(res).toContain({ label: input.label });
      expect(res.notes.length).toEqual(1);
      expect(res.notes[0]).toContain(noteData[0]);
    });
  });

  describe("when providing valid input WITH 'noteIds' specified", () => {
    test("it should successfully create a new tag WITH all 'note' relations", async () => {
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

      type Input = inferProcedureInput<AppRouter["tag"]["update"]>;
      const input: Input = {
        id: tagData[0]?.id as string,
        label: "A newly updated label for your enjoyment!",
        // @ts-expect-error The 'id' will always be defined!
        noteIds: [noteData[0].id, noteData[1].id, noteData[2].id],
      };

      const res = await caller.tag.update(input);

      expect(res).toContain({ label: input.label });
      expect(res.notes.length).toEqual(3);
      expect(res.notes[0]).toContain(noteData[0]);
      expect(res.notes[1]).toContain(noteData[1]);
      expect(res.notes[2]).toContain(noteData[2]);
    });
  });

  describe("when providing an INVALID tag ID", () => {
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

      type Input = inferProcedureInput<AppRouter["tag"]["update"]>;
      const input: Input = {
        id: dummyUUID,
        label: "Well this won't work at all!",
      };

      await expect(caller.tag.update(input)).rejects.toThrow("An unexpected error occurred!");
    });
  });

  describe("when providing valid input WITH INVALID 'noteIds' specified", () => {
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

      type Input = inferProcedureInput<AppRouter["tag"]["update"]>;
      const input: Input = {
        id: tagData[0]?.id as string,
        label: "This label is never going to shine like it should!",
        // @ts-expect-error The 'id' will always be defined!
        noteIds: [dummyUUID, noteData[1].id],
      };

      await expect(caller.tag.update(input)).rejects.toThrow("An unexpected error occurred!");
    });
  });
});

describe("given executing the 'delete' procedure of the 'tag' tRPC router", () => {
  beforeEach(async () => {
    await seedDatabase();
  });

  afterEach(async () => {
    await flushDatabase();
  });

  describe("when providing valid tag ID", () => {
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

      type Input = inferProcedureInput<AppRouter["tag"]["delete"]>;
      const input: Input = {
        id: tagData[1]?.id as string,
      };

      await caller.tag.delete(input);

      expect(await prisma.tag.count({ where: { id: tagData[1]?.id as string } })).toEqual(0);
      expect(await prisma.tagsOnNotes.count({ where: { tagId: tagData[1]?.id as string } })).toEqual(0);
    });
  });

  describe("when providing an INVALID tag ID", () => {
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

      type Input = inferProcedureInput<AppRouter["tag"]["delete"]>;
      const input: Input = {
        id: dummyUUID,
      };

      await expect(caller.tag.delete(input)).rejects.toThrow("An unexpected error occurred!");
    });
  });
});
