import { ComponentProps } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TextEditorPreviewProps extends ComponentProps<'div'> {
  message: string;
}

export default function TextEditorPreview(props: TextEditorPreviewProps) {
  return (
    <div {...props}>
      <ReactMarkdown
        className="prose dark:prose-invert prose-li:my-0"
        remarkPlugins={[remarkGfm]}
      >
        {props.message}
      </ReactMarkdown>
    </div>
  );
}
