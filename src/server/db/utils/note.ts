import type { PrismaClient } from "@prisma/client";
import type {
  Id,
  IdIncludeRelations,
  NoteIncludeTags,
  NoteCreateInput,
  NoteUpdateInput,
  IncludeRelations,
} from "../../types";

/**
 * Create a new note.
 *
 * @param prisma An instantiated Prisma Client.
 * @param payload The data to store in the new record.
 */
export async function createNote(prisma: PrismaClient, payload: NoteCreateInput): Promise<NoteIncludeTags> {
  const newNote: NoteIncludeTags = {
    ...(await prisma.note.create({
      data: {
        title: payload.title,
        markdown: payload.markdown,
      },
    })),
    tags: [],
  };

  if (payload.tagIds.length > 0) {
    if ((await prisma.tag.count({ where: { id: { in: payload.tagIds } } })) !== payload.tagIds.length) {
      throw "One or more 'tagIds' are not valid!";
    }

    const connectTagsToNotes = payload.tagIds.map((tagId) => {
      return prisma.tagsOnNotes.create({
        data: {
          note: { connect: { id: newNote.id } },
          tag: { connect: { id: tagId } },
        },
        include: { tag: true },
      });
    });

    const newNoteTags = await prisma.$transaction(connectTagsToNotes);

    newNote.tags = newNoteTags.map((newNoteTag) => {
      return newNoteTag.tag;
    });
  }

  return newNote;
}

/**
 * Get a specific note by ID.
 *
 * @param prisma An instantiated Prisma Client.
 * @param payload Retrieve the record from the database. (Optionally include relations if specified)
 */
export async function getNote(prisma: PrismaClient, payload: IdIncludeRelations): Promise<NoteIncludeTags> {
  const note: NoteIncludeTags = {
    ...(await prisma.note.findUniqueOrThrow({ where: { id: payload.id } })),
    tags: [],
  };

  if (payload.includeRelations) {
    note.tags = (await prisma.tagsOnNotes.findMany({ where: { noteId: note.id }, include: { tag: true } })).map(
      (noteTag) => {
        return noteTag.tag;
      }
    );
  }

  return note;
}

/**
 * Get all the notes.
 *
 * @param prisma An instantiated Prisma Client.
 * @param payload Optionally include relations if specified
 */
export async function getAllNotes(prisma: PrismaClient, payload: IncludeRelations): Promise<NoteIncludeTags[]> {
  const notes = (await prisma.note.findMany()).map((note) => {
    return { ...note, tags: [] };
  }) as NoteIncludeTags[];

  if (payload.includeRelations) {
    const notesIncludesTagsPromises = notes.map(async (note) => {
      return await getNote(prisma, { id: note.id, includeRelations: true });
    });

    return await Promise.all(notesIncludesTagsPromises);
  }

  return notes;
}

/**
 * Update a given note.
 *
 * @param prisma An instantiated Prisma Client.
 * @param payload The data to update in an existing record.
 */
export async function updateNote(prisma: PrismaClient, payload: Partial<NoteUpdateInput>): Promise<NoteIncludeTags> {
  const updatedNote: NoteIncludeTags = {
    ...(await prisma.note.update({
      data: {
        title: payload.title,
        markdown: payload.markdown,
      },
      where: {
        id: payload.id,
      },
    })),
    tags: [],
  };

  if (payload.tagIds) {
    const deleteTagsToNotes = prisma.tagsOnNotes.deleteMany({ where: { noteId: updatedNote.id } });

    const connectTagsToNotes = payload.tagIds.map((tagId) => {
      return prisma.tagsOnNotes.create({
        data: {
          note: { connect: { id: updatedNote.id } },
          tag: { connect: { id: tagId } },
        },
        include: { tag: true },
      });
    });

    await prisma.$transaction([deleteTagsToNotes, ...connectTagsToNotes]);
  }

  updatedNote.tags = (
    await prisma.tagsOnNotes.findMany({ where: { noteId: updatedNote.id }, include: { tag: true } })
  ).map((tagsOnNotes) => {
    return tagsOnNotes.tag;
  });

  return updatedNote;
}

/**
 * Delete a specific note by ID.
 *
 * @param prisma An instantiated Prisma Client.
 * @param payload Delete the record from the database.
 */
export async function deleteNote(prisma: PrismaClient, payload: Id): Promise<void> {
  const deleteTagsToNotes = prisma.tagsOnNotes.deleteMany({ where: { noteId: payload.id } });

  const deleteNote = prisma.note.delete({ where: { id: payload.id } });

  await prisma.$transaction([deleteTagsToNotes, deleteNote]);
}
