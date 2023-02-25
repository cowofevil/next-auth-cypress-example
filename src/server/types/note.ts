import type { z } from "zod";
import type { NoteSchema, NoteUpdateInputSchema, NoteCreateInputSchema } from "../schemas";
import type { Tag } from "./tag";

// Note Types
export type Note = z.infer<typeof NoteSchema>;
export type NoteIncludeTags = Note & { tags: Tag[] };
export type NoteCreateInput = z.infer<typeof NoteCreateInputSchema>;
export type NoteUpdateInput = z.infer<typeof NoteUpdateInputSchema>;
