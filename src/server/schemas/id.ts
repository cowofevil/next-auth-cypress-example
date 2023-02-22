import { z } from "zod";
import { IncludeRelationsSchema } from "./includeRelations";

export const IdSchema = z.object({ id: z.string().uuid() });
export const IdIncludeRelationsSchema = IdSchema.merge(IncludeRelationsSchema);
