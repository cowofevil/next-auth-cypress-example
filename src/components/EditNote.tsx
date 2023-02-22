import { api } from "../utils/api";
import { NoteForm } from "./NoteForm";
import { useRouter } from "next/router";
import type { NoteData } from "../types";

type EditNoteProps = {
  onSubmit: (data: NoteData, id: string) => void;
};

export function EditNote({ onSubmit }: EditNoteProps) {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: notesData, status: notesQueryStatus } = api.note.get.useQuery({ id, includeRelations: true });

  if (notesQueryStatus === "loading") {
    return <h1>Loading...</h1>;
  } else if (notesQueryStatus === "error") {
    return <h1>Error!!!</h1>;
  }

  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        id={id}
        title={notesData?.title}
        markdown={notesData?.markdown}
        tags={notesData?.tags}
        onSubmit={(data, id) => {
          onSubmit(data, id as string);
        }}
      />
    </>
  );
}
