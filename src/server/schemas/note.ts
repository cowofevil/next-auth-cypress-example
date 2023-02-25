import { z } from "zod";
import { NoteSchema as NoteZodSchema } from "src/gen/zodPrismaSchemas";

// Note Schemas
export const NoteSchema = NoteZodSchema;

export const NoteUpdateInputSchema = NoteZodSchema.omit({
  createdAt: true,
  updatedAt: true,
})
  .extend({ tagIds: z.string().uuid().array() })
  .partial()
  .required({ id: true });

export const NoteCreateInputSchema = NoteUpdateInputSchema.omit({
  id: true,
}).required();
