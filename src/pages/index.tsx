import { api } from "../utils/api";
import { type NextPage } from "next";
import { NoteList } from "../components/NoteList";

const HomePage: NextPage = () => {
  const { data: notesData, refetch: refetchNotes } = api.note.getAll.useQuery({ includeRelations: true });
  const { data: tagsData, refetch: refetchTags } = api.tag.getAll.useQuery({ includeRelations: false });

  const updateTagMutation = api.tag.update.useMutation({
    onSuccess: () => {
      void refetchTags();
      void refetchNotes();
    },
  });
  const deleteTagMutation = api.tag.delete.useMutation({
    onSuccess: () => {
      void refetchTags();
      void refetchNotes();
    },
  });

  function updateTag(id: string, label: string) {
    updateTagMutation.mutate({ id, label, noteIds: [] });
  }

  function deleteTag(id: string) {
    deleteTagMutation.mutate({ id });
  }

  return (
    <NoteList notes={notesData ?? []} availableTags={tagsData ?? []} onUpdateTag={updateTag} onDeleteTag={deleteTag} />
  );
};

export default HomePage;
