import type { z } from "zod";
import type { IdSchema, IdIncludeRelationsSchema } from "../schemas";

// ID Types
export type Id = z.infer<typeof IdSchema>;
export type IdIncludeRelations = z.infer<typeof IdIncludeRelationsSchema>;
