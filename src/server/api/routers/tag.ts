import { TRPCError } from "@trpc/server";
import { createTag, getTag, getAllTags, updateTag, deleteTag } from "../../db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  IdSchema,
  IdIncludeRelationsSchema,
  TagCreateInputSchema,
  TagUpdateInputSchema,
  IncludeRelationsSchema,
} from "../../schemas";

export const tagRouter = createTRPCRouter({
  create: protectedProcedure.input(TagCreateInputSchema).mutation(async ({ input, ctx }) => {
    try {
      return await createTag(ctx.prisma, input);
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
      return await getTag(ctx.prisma, input);
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
      return await getAllTags(ctx.prisma, input ?? { includeRelations: true });
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

  update: protectedProcedure.input(TagUpdateInputSchema).mutation(async ({ input, ctx }) => {
    try {
      return await updateTag(ctx.prisma, input);
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
      return await deleteTag(ctx.prisma, input);
    } catch (e) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "An unexpected error occurred!",
        cause: e,
      });
    }
  }),
});
