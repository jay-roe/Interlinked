import PostButton from '@/components/Buttons/PostButton/PostButton';
import { useAuth } from '@/contexts/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import { CreatePostProps } from '@/types/CreatPostProps';
import { useTranslations } from 'next-intl';

export default function CreatePost({ getText }: CreatePostProps) {
  const t = useTranslations('CreatePost.CreatePost');
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    getText(message);
    setMessage('');
  };

  return (
    <div>
      <div className="w-full rounded-lg bg-white bg-opacity-[0.12] p-4 px-7 shadow-lg">
        <div className="flex flex-row gap-3 pb-2">
          <div data-testid="profile-pic">
            {currentUser.coverPhoto == null ? (
              <FaUserCircle data-testid="placeholder-pic" size="2em" />
            ) : (
              currentUser.coverPhoto
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold">{t('create')}</h1>
            <h4 className="">{t('write-anything')}</h4>
          </div>
        </div>
        <div>
          <form>
            <textarea
              id="message"
              data-testid="post-content"
              className="   row-span-4 h-[10rem] w-full rounded-lg bg-purple-text-area p-1 text-sm text-white shadow-lg "
              placeholder={t('placeholder')}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></textarea>
          </form>
        </div>

        <div className="flex justify-end">
          <button
            className="flex grow justify-end  "
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
