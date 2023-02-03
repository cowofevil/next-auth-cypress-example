import { prisma } from "../src/server/db";
import { noteData, tagData, tagsOnNotesData } from "./testData";

export async function flushDatabase() {
  const models = Object.keys(prisma).filter((key) => key[0] !== "_" && key[0] !== "$");

  for (const model of models) {
    /* eslint-disable */
    // @ts-expect-error Model names are guaranteed to be strings!
    await prisma[model].deleteMany();
    /* eslint-enable */
  }
}

export async function seedDatabase() {
  for (const t of tagData) {
    await prisma.tag.create({
      data: t,
    });
  }

  for (const n of noteData) {
    await prisma.note.create({
      data: n,
    });
  }

  for (const ton of tagsOnNotesData) {
    await prisma.tagsOnNotes.create({
      data: ton,
    });
  }
}
