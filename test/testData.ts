import type { Prisma } from "@prisma/client";

export const tagData: Prisma.TagCreateInput[] = [
  {
    id: "2b01cd4b-90a1-41eb-a998-ee4751f6d388",
    label: "Tag1",
  },
  {
    id: "7a3b7726-ee2c-404b-849f-228f663e07a8",
    label: "Tag2",
  },
  {
    id: "87695704-8c3d-4e1d-9e9d-feff7571abe7",
    label: "Tag3",
  },
  {
    id: "90d00f18-6c17-45d6-8f31-f1c905e2145e",
    label: "Tag4",
  },
  {
    id: "ef86c517-cb7f-41a3-8b1b-629bcf221a2b",
    label: "Tag5",
  },
  {
    id: "09258a0b-35fe-4e53-99d9-4fa061672810",
    label: "Tag6",
  },
];

export const noteData: Prisma.NoteCreateInput[] = [
  {
    id: "016db3e6-234f-49f4-b76d-d5fa900e1252",
    title: "Note1",
    markdown: "Markdown1",
  },
  {
    id: "9196739c-89f3-4b4e-9a3a-9211b0ffd761",
    title: "Note2",
    markdown: "Markdown2",
  },
  {
    id: "fb651629-1cae-4f69-af9c-5b3a65eab4a6",
    title: "Note3",
    markdown: "Markdown3",
  },
  {
    id: "df096658-b08c-4d56-ac6b-ae1bacc481ae",
    title: "Note4",
    markdown: "Markdown4",
  },
  {
    id: "df3eb808-811c-4f25-91f1-c3b244c81102",
    title: "Note5",
    markdown: "Markdown5",
  },
  {
    id: "9cdefcb7-9e40-430e-8dff-03684b35f1f7",
    title: "Note6",
    markdown: "Markdown6",
  },
];

export const tagsOnNotesData: Prisma.TagsOnNotesCreateInput[] = [
  {
    note: {
      connect: { id: "016db3e6-234f-49f4-b76d-d5fa900e1252" },
    },
    tag: {
      connect: { id: "2b01cd4b-90a1-41eb-a998-ee4751f6d388" },
    },
  },
  {
    note: {
      connect: { id: "9196739c-89f3-4b4e-9a3a-9211b0ffd761" },
    },
    tag: {
      connect: { id: "7a3b7726-ee2c-404b-849f-228f663e07a8" },
    },
  },
  {
    note: {
      connect: { id: "fb651629-1cae-4f69-af9c-5b3a65eab4a6" },
    },
    tag: {
      connect: { id: "87695704-8c3d-4e1d-9e9d-feff7571abe7" },
    },
  },
  {
    note: {
      connect: { id: "df096658-b08c-4d56-ac6b-ae1bacc481ae" },
    },
    tag: {
      connect: { id: "90d00f18-6c17-45d6-8f31-f1c905e2145e" },
    },
  },
  {
    note: {
      connect: { id: "df3eb808-811c-4f25-91f1-c3b244c81102" },
    },
    tag: {
      connect: { id: "ef86c517-cb7f-41a3-8b1b-629bcf221a2b" },
    },
  },
  {
    note: {
      connect: { id: "9cdefcb7-9e40-430e-8dff-03684b35f1f7" },
    },
    tag: {
      connect: { id: "09258a0b-35fe-4e53-99d9-4fa061672810" },
    },
  },
];
