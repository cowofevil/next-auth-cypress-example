import type { NoteCreateInput, NoteUpdateInput, TagUpdateInput } from "../server/types";

export type Note = NoteUpdateInput;

export type NoteData = Omit<NoteCreateInput, "tagIds"> & {
  tags: Tag[];
};

export type Tag = Required<Omit<TagUpdateInput, "noteIds">>;
