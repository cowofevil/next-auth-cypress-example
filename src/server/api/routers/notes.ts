import { z } from "zod";
import { TRPCError } from "@trpc/server";
import type { TagSchema } from "src/gen/zodPrismaSchemas";
import { NoteSchema } from "src/gen/zodPrismaSchemas";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

const NoteSchemaInput = NoteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({ tagIds: z.string().array() });

export const notesRouter = createTRPCRouter({
  create: protectedProcedure.input(NoteSchemaInput).mutation(async ({ input, ctx }) => {
    let newNote: z.infer<typeof NoteSchema> & { tags: z.infer<typeof TagSchema>[] };

    try {
      newNote = {
        ...(await ctx.prisma.note.create({
          data: {
            title: input.title,
            markdown: input.markdown,
          },
        })),
        tags: [],
      };
    } catch (e) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "An unexpected error occurred, please try again later.",
        cause: e,
      });
    }

    if (input.tagIds.length > 0) {
      const connectTagsToNotes = input.tagIds.map((tagId) => {
        return ctx.prisma.tagsOnNotes.create({
          data: {
            note: { connect: { id: newNote.id } },
            tag: { connect: { id: tagId } },
          },
        });
      });

      try {
        await ctx.prisma.$transaction(connectTagsToNotes);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "An unexpected error occurred, please try again later.",
          cause: e,
        });
      }

      try {
        return await ctx.prisma.note.findUniqueOrThrow({ where: { id: newNote.id }, include: { tags: true } });
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "An unexpected error occurred, please try again later.",
          cause: e,
        });
      }
    }

    return newNote;
  }),

  get: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  update: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  delete: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
