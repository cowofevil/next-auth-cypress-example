import NextLink from "next/link";
import { api } from "../utils/api";
import type { FormEvent } from "react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import type { NoteData, Tag } from "../types";
import CreatableReactSelect from "react-select/creatable";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";

type NoteFormProps = {
  id?: string;
  onSubmit: (data: NoteData, id?: string) => void;
} & Partial<NoteData>;

export function NoteForm({ onSubmit, id = "", title = "", markdown = "", tags = [] }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const router = useRouter();

  const { data: tagsData, refetch: refetchTags } = api.tag.getAll.useQuery({ includeRelations: false });

  const createTagMutation = api.tag.create.useMutation({
    onSuccess: (data) => {
      setSelectedTags((prev) => [...prev, data]);
      void refetchTags();
    },
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit(
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        title: titleRef.current!.value,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        markdown: markdownRef.current!.value,
        tags: selectedTags,
      },
      id
    );

    void router.push("..");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control aria-label="note-title-input" ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                aria-label="select-tags-dropdown"
                onCreateOption={(label) => {
                  createTagMutation.mutate({ label, noteIds: [] });
                }}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={tagsData?.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            aria-label="note-body-input"
            defaultValue={markdown}
            required
            as="textarea"
            ref={markdownRef}
            rows={15}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button aria-label="save-button" type="submit" variant="primary">
            Save
          </Button>
          <NextLink href=".." passHref>
            <Button aria-label="cancel-button" type="button" variant="outline-secondary">
              Cancel
            </Button>
          </NextLink>
        </Stack>
      </Stack>
    </Form>
  );
}
