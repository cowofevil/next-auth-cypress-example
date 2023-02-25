import { z } from "zod";

export const IncludeRelationsSchema = z.object({ includeRelations: z.boolean() });
