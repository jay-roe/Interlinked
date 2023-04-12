import { EditorState } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import { defaultKeymap } from '@codemirror/commands';
import { EditorView, keymap } from '@codemirror/view';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { oneDark } from '@codemirror/theme-one-dark';
import {
  ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface TextEditorProps extends ComponentProps<'div'> {
  onTextChange: (doc: string) => void;
  text?: string;
}

export default function TextEditor(props: TextEditorProps) {
  const editorRef = useRef(null);
  const [editorView, setEditorView] = useState(null);
  const { onTextChange, text } = props;

  const handleChange = useCallback(
    (state: EditorState) => {
      onTextChange(state.doc.toJSON().join('\n'));
    },
    [onTextChange]
  );

  // Create editor view on initial load
  useEffect(() => {
    if (!editorRef.current) return;

    const initialEditorState = EditorState.create({
      doc: text || '\n\n\n\n',
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
            handleChange && handleChange(update.state);
          }
        }),
      ],
    });

    const editorView = new EditorView({
      state: initialEditorState,
      parent: editorRef.current,
    });
    setEditorView(editorView);
    return () => {
      editorView.destroy();
    };
  }, [editorRef]);

  return (
    <div
      {...props}
      className={`${props.className} rounded-md`}
      ref={editorRef}
    ></div>
  );
}
