import PostButton from '@/components/Buttons/PostButton/PostButton';
import { useAuth } from '@/contexts/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { useCallback, useState } from 'react';
import { CreatePostProps } from '@/types/CreatPostProps';
import { useTranslations } from 'next-intl';
import TextEditor from '@/components/TextEditor/TextEditor';
import TextEditorPreview from '@/components/TextEditor/TextEditorPreview';
import Link from '@/components/Link/Link';
import ImageOptimized from '@/components/ImageOptimized/ImageOptimized';
import { Tab } from '@headlessui/react';

export default function CreatePost({ getText }: CreatePostProps) {
  const t = useTranslations('CreatePost.CreatePost');
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
            <h1 className="text-2xl font-bold">{t('create')}</h1>
            <h4 className="">{t('write-anything')}</h4>
            <h4>
              {t('support-markdown')}
              <Link
                className="font-bold text-yellow-500 transition-colors hover:text-yellow-400"
                href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
                target="_blank"
                rel="noreferrer"
              >
                {t('visit-guide')}
              </Link>{' '}
              {t('for-more-info')}
            </h4>
          </div>
        </div>
        <Tab.Group>
          <Tab.List className="flex gap-1 rounded-xl bg-white bg-opacity-[0.12] p-1">
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 outline-none ${
                  selected
                    ? 'bg-yellow-700 shadow'
                    : 'text-yellow-500 hover:bg-white/[0.12] hover:text-white'
                }`
              }
            >
              {t('edit')}
            </Tab>
            <Tab
              data-testid="create-post-preview-button"
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 outline-none ${
                  selected
                    ? 'bg-yellow-700 shadow'
                    : 'text-yellow-500 hover:bg-white/[0.12] hover:text-white'
                }`
              }
            >
              {t('preview')}
            </Tab>
          </Tab.List>
          <Tab.Panels className="my-3">
            <Tab.Panel>
              <TextEditor
                data-testid="post-content"
                key={submitted ? 0 : 1}
                text={message}
                onTextChange={useCallback((newMessage: string) => {
                  setMessage(newMessage);
                }, [])}
              />
            </Tab.Panel>
            <Tab.Panel className="w-full rounded-lg bg-white bg-opacity-[0.12] p-4 px-7">
              <TextEditorPreview
                data-testid="post-preview-content"
                message={message}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
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
    </div>
  );
}
