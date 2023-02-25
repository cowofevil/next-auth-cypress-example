import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createNote, getNote, getAllNotes, updateNote, deleteNote } from "../../db";
import {
  IdSchema,
  IdIncludeRelationsSchema,
  NoteCreateInputSchema,
  NoteUpdateInputSchema,
  IncludeRelationsSchema,
} from "../../schemas";

export const noteRouter = createTRPCRouter({
  create: protectedProcedure.input(NoteCreateInputSchema).mutation(async ({ input, ctx }) => {
    try {
      return await createNote(ctx.prisma, input);
    } catch (e) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "An unexpected error occurred!",
        cause: e,
      });
    }
  }),

  get: protectedProcedure.input(IdIncludeRelationsSchema).query(async ({ input, ctx }) => {
    try {
      return await getNote(ctx.prisma, input);
    } catch (e) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "An unexpected error occurred!",
        cause: e,
      });
    }
  }),

  getAll: protectedProcedure.input(IncludeRelationsSchema.nullish()).query(async ({ input, ctx }) => {
    try {
      return await getAllNotes(ctx.prisma, input ?? { includeRelations: true });
      /* c8 ignore start */
    } catch (e) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "An unexpected error occurred!",
        cause: e,
      });
    }
    /* c8 ignore stop */
  }),

  update: protectedProcedure.input(NoteUpdateInputSchema).mutation(async ({ input, ctx }) => {
    try {
      return await updateNote(ctx.prisma, input);
    } catch (e) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "An unexpected error occurred!",
        cause: e,
      });
    }
  }),

  delete: protectedProcedure.input(IdSchema).mutation(async ({ input, ctx }) => {
    try {
      return await deleteNote(ctx.prisma, input);
    } catch (e) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "An unexpected error occurred!",
        cause: e,
      });
    }
  }),
});
