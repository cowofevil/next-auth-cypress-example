import NextLink from "next/link";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";

type NoteProps = {
  id: string;
  onDelete: (id: string) => void;
};

export function Note({ id, onDelete }: NoteProps) {
  const router = useRouter();
  const noteQuery = api.note.get.useQuery({ id, includeRelations: true });

  if (noteQuery.status === "loading") {
    return <h1>Loading...</h1>;
  } else if (noteQuery.status === "error") {
    return <h1>Error!!!</h1>;
  }

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{noteQuery?.data?.title}</h1>
          {(noteQuery?.data?.tags?.length ?? 0) > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {noteQuery?.data?.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <NextLink href={`/${noteQuery?.data?.id ?? ""}/edit`} passHref>
              <Button aria-label="edit-button" variant="primary">
                Edit
              </Button>
            </NextLink>
            <Button
              aria-label="delete-button"
              onClick={() => {
                onDelete(noteQuery?.data?.id ?? "");
                void router.push("/");
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
            <NextLink href="/" passHref>
              <Button aria-label="back-button" variant="outline-secondary">
                Back
              </Button>
            </NextLink>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{noteQuery?.data?.markdown}</ReactMarkdown>
    </>
  );
}
