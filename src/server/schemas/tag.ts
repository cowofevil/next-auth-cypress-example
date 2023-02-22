import { z } from "zod";
import { TagSchema as TagZodSchema } from "src/gen/zodPrismaSchemas";

// Tag Schemas
export const TagSchema = TagZodSchema;

export const TagUpdateInputSchema = TagZodSchema.omit({
  createdAt: true,
  updatedAt: true,
})
  .extend({ noteIds: z.string().uuid().array() })
  .partial()
  .required({ id: true });

export const TagCreateInputSchema = TagUpdateInputSchema.omit({
  id: true,
}).required();
