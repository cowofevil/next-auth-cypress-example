import type { NextPage } from "next";
import { api } from "../../utils/api";
import type { NoteData } from "../../types";
import { EditNote } from "../../components/EditNote";

const EditNotePage: NextPage = () => {
  const updateNoteMutation = api.note.update.useMutation();

  function onUpdateNote({ tags, ...data }: NoteData, id: string) {
    updateNoteMutation.mutate({ ...data, id, tagIds: tags.map((tag) => tag.id) });
  }

  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <EditNote onSubmit={onUpdateNote} />
    </>
  );
};

export default EditNotePage;
