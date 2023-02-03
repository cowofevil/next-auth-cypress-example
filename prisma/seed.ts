import { PrismaClient } from "@prisma/client";
// noinspection ES6PreferShortImport
import { tagData, noteData, tagsOnNotesData } from "../test/testData"; // Path needs to be relative for ts-node!

const prisma = new PrismaClient({
  log: ["error"],
});

export async function main() {
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

main()
  .then(async () => {
    await prisma.$disconnect();
    // eslint-disable-next-line no-console
    console.log("\nSeeding Successful!");
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.log("\nSeeding Failed!");
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
