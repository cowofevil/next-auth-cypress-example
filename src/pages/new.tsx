import { api } from "../utils/api";
import type { NextPage } from "next";
import type { NoteData } from "../types";
import { NoteForm } from "../components/NoteForm";

const NewNotePage: NextPage = () => {
  const createNoteMutation = api.note.create.useMutation();

  function onCreateNote({ tags, ...data }: NoteData) {
    createNoteMutation.mutate({ ...data, tagIds: tags.map((tag) => tag.id) });
  }

  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={onCreateNote} />
    </>
  );
};

export default NewNotePage;
