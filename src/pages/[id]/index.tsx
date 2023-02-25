import type { NextPage } from "next";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { Note } from "../../components/Note";

const NoteByIdPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const deleteNoteMutation = api.note.delete.useMutation();

  function onDeleteNote(id: string) {
    deleteNoteMutation.mutate({ id });
  }

  return <Note id={id} onDelete={onDeleteNote} />;
};

export default NoteByIdPage;
