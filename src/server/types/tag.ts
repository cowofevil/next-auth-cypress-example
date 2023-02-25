import type { z } from "zod";
import type { TagSchema, TagUpdateInputSchema, TagCreateInputSchema } from "../schemas";
import type { Note } from "./note";

// Tag Types
export type Tag = z.infer<typeof TagSchema>;
export type TagIncludeNotes = Tag & { notes: Note[] };
export type TagCreateInput = z.infer<typeof TagCreateInputSchema>;
export type TagUpdateInput = z.infer<typeof TagUpdateInputSchema>;
