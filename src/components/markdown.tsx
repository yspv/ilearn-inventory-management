"use client";
import {
  InsertTable,
  InsertThematicBreak,
  CreateLink,
  BoldItalicUnderlineToggles,
  UndoRedo,
  ListsToggle,
  MDXEditor,
  headingsPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  listsPlugin,
  linkPlugin,
  tablePlugin,
  thematicBreakPlugin,
  MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor";
import { Separator } from "@radix-ui/themes";
import React from "react";

export function BasicMarkdownEditor(props: {
  markdown: string;
  onChange(markdown: string): void;
}) {
  const { markdown, onChange } = props;
  const ref = React.useRef<MDXEditorMethods | null>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.setMarkdown(markdown);
    }
  }, [markdown]);
  return (
    <MDXEditor
      ref={ref}
      placeholder="Add a comment..."
      markdown={markdown}
      onChange={onChange}
      plugins={[markdownShortcutPlugin()]}
    />
  );
}

export default function MarkdownEditor(props: {
  markdown: string;
  onChange(value: string): void;
}) {
  const { markdown, onChange } = props;
  return (
    <MDXEditor
      markdown={markdown}
      onChange={onChange}
      plugins={[
        headingsPlugin(),
        markdownShortcutPlugin(),
        listsPlugin(),
        linkPlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <Separator orientation="vertical" />
              <BoldItalicUnderlineToggles />
              <Separator orientation="vertical" />
              <ListsToggle />
              <CreateLink />
              <InsertThematicBreak />
              <InsertTable />
            </>
          ),
        }),
      ]}
    />
  );
}
