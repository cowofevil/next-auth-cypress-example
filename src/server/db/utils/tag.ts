import type { PrismaClient } from "@prisma/client";
import type { Id, IdIncludeRelations, TagIncludeNotes, TagCreateInput, TagUpdateInput } from "../../types";
import type { IncludeRelations } from "../../types";

/**
 * Create a new tag.
 *
 * @param prisma An instantiated Prisma Client.
 * @param payload The data to store in the new record.
 */
export async function createTag(prisma: PrismaClient, payload: TagCreateInput): Promise<TagIncludeNotes> {
  const newTag: TagIncludeNotes = {
    ...(await prisma.tag.create({
      data: {
        label: payload.label,
      },
    })),
    notes: [],
  };

  if (payload.noteIds.length > 0) {
    const connectNotesToTag = payload.noteIds.map((noteId) => {
      return prisma.tagsOnNotes.create({
        data: {
          note: { connect: { id: noteId } },
          tag: { connect: { id: newTag.id } },
        },
        include: { note: true },
      });
    });

    const newTagNotes = await prisma.$transaction(connectNotesToTag);

    newTag.notes = newTagNotes.map((newNoteTag) => {
      return newNoteTag.note;
    });
  }

  return newTag;
}

/**
 * Get a specific tag by ID.
 *
 * @param prisma An instantiated Prisma Client.
 * @param payload Retrieve the record from the database. (Optionally include relations if specified)
 */
export async function getTag(prisma: PrismaClient, payload: IdIncludeRelations): Promise<TagIncludeNotes> {
  const tag: TagIncludeNotes = {
    ...(await prisma.tag.findUniqueOrThrow({ where: { id: payload.id } })),
    notes: [],
  };

  if (payload.includeRelations) {
    tag.notes = (await prisma.tagsOnNotes.findMany({ where: { tagId: tag.id }, include: { note: true } })).map(
      (tagNote) => {
        return tagNote.note;
      }
    );
  }

  return tag;
}

/**
 * Get all the tags.
 *
 * @param prisma An instantiated Prisma Client.
 * @param payload Optionally include relations if specified
 */
export async function getAllTags(prisma: PrismaClient, payload: IncludeRelations): Promise<TagIncludeNotes[]> {
  const tags = (await prisma.tag.findMany()).map((tag) => {
    return { ...tag, notes: [] };
  }) as TagIncludeNotes[];

  if (payload.includeRelations) {
    const tagsIncludesNotesPromises = tags.map(async (tag) => {
      return await getTag(prisma, { id: tag.id, includeRelations: true });
    });

    return await Promise.all(tagsIncludesNotesPromises);
  }

  return tags;
}

/**
 * Update a given tag.
 *
 * @param prisma An instantiated Prisma Client.
 * @param payload The data to update in an existing record.
 */
export async function updateTag(prisma: PrismaClient, payload: Partial<TagUpdateInput>): Promise<TagIncludeNotes> {
  const updatedTag: TagIncludeNotes = {
    ...(await prisma.tag.update({
      data: {
        label: payload.label,
      },
      where: {
        id: payload.id,
      },
    })),
    notes: [],
  };

  if (payload.noteIds && payload.noteIds.length > 0) {
    if ((await prisma.note.count({ where: { id: { in: payload.noteIds } } })) !== payload.noteIds.length) {
      throw "One or more 'tagIds' are not valid!";
    }

    const deleteNotesToTags = prisma.tagsOnNotes.deleteMany({ where: { tagId: updatedTag.id } });

    const connectNotesToTags = payload.noteIds.map((noteId) => {
      return prisma.tagsOnNotes.create({
        data: {
          note: { connect: { id: noteId } },
          tag: { connect: { id: updatedTag.id } },
        },
        include: { tag: true },
      });
    });

    await prisma.$transaction([deleteNotesToTags, ...connectNotesToTags]);
  }

  updatedTag.notes = (
    await prisma.tagsOnNotes.findMany({ where: { tagId: updatedTag.id }, include: { note: true } })
  ).map((tagsOnNotes) => {
    return tagsOnNotes.note;
  });

  return updatedTag;
}

/**
 * Delete a specific tag by ID.
 *
 * @param prisma An instantiated Prisma Client.
 * @param payload Delete the record from the database.
 */
export async function deleteTag(prisma: PrismaClient, payload: Id): Promise<void> {
  const deleteNotesToTags = prisma.tagsOnNotes.deleteMany({ where: { tagId: payload.id } });

  const deleteTag = prisma.tag.delete({ where: { id: payload.id } });

  await prisma.$transaction([deleteNotesToTags, deleteTag]);
}
