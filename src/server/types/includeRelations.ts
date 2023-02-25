import type { z } from "zod";
import type { IncludeRelationsSchema } from "../schemas";

export type IncludeRelations = z.infer<typeof IncludeRelationsSchema>;
