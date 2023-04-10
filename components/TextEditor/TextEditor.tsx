import { EditorState } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import { defaultKeymap } from '@codemirror/commands';
import { EditorView, keymap } from '@codemirror/view';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { oneDark } from '@codemirror/theme-one-dark';
import { useEffect, useRef, useState } from 'react';

export default function TextEditor(props: {
  initialText?: string;
  onChange: (state: EditorState) => void;
}) {
  const editorRef = useRef(null);
  const [editorView, setEditorView] = useState(null);

  // Create editor view on initial load
  useEffect(() => {
    if (!editorRef.current) return;

    const initialEditorState = EditorState.create({
      doc: props.initialText,
      extensions: [
        basicSetup,
        keymap.of(defaultKeymap),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        oneDark,
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            props.onChange && props.onChange(update.state);
          }
        }),
      ],
    });

    const editorView = new EditorView({
      state: initialEditorState,
      parent: editorRef.current,
    });
  }, [editorRef]);

  return <div>TextEditor</div>;
}
