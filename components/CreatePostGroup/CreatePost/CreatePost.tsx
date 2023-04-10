import PostButton from '@/components/Buttons/PostButton/PostButton';
import { useAuth } from '@/contexts/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { useCallback, useState } from 'react';
import { CreatePostProps } from '@/types/CreatPostProps';
import TextEditor from '@/components/TextEditor/TextEditor';
import TextEditorPreview from '@/components/TextEditor/TextEditorPreview';
import Link from 'next/link';
import ImageOptimized from '@/components/ImageOptimized/ImageOptimized';

export default function CreatePost({ getText }: CreatePostProps) {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    getText(message);
    setMessage('');
    setSubmitted(true);
  };

  return (
    <div>
      <div className="w-full rounded-lg bg-white bg-opacity-[0.12] p-4 px-7 shadow-lg">
        <div className="flex flex-row gap-3 pb-2">
          <div data-testid="profile-pic">
            {currentUser?.profilePicture ? (
              <ImageOptimized
                data-testid="create-post-profile-pic"
                className="h-8 w-8 max-w-none rounded-full md:h-12 md:w-12"
                src={currentUser.profilePicture}
                alt={currentUser.name}
                width={32}
                height={32}
              />
            ) : (
              <FaUserCircle data-testid="placeholder-pic" size="2em" />
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold">Create a Post </h1>
            <h4>Write anything to your heart&apos;s content.</h4>
            <h4>
              Posts support Markdown. Use `backticks` to write code and more!{' '}
              <Link
                className="font-bold text-yellow-500 transition-colors hover:text-yellow-400"
                href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
                target="_blank"
                rel="noreferrer"
              >
                Visit the Markdown guide
              </Link>{' '}
              for more information.
            </h4>
          </div>
        </div>
        <div className="mb-3">
          <TextEditor
            key={submitted ? 0 : 1}
            initialText={message}
            onTextChange={useCallback((newMessage: string) => {
              setMessage(newMessage);
            }, [])}
          />
        </div>

        <div className="flex justify-end">
          <button
            className="justify-end"
            data-testid="post-button"
            onClick={handleSubmit}
          >
            <PostButton></PostButton>
          </button>
        </div>
      </div>
      {message && (
        <div className="mt-3 w-full rounded-lg bg-white bg-opacity-[0.12] p-4 px-7 shadow-lg">
          <TextEditorPreview message={message} />
        </div>
      )}
    </div>
  );
}
