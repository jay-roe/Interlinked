import Button from '@/components/Buttons/Button';
import PostButton from '@/components/Buttons/PostButton/PostButton';
import { useAuth } from '@/contexts/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import type { User } from '@/types/User';
import Link from 'next/link';
import { useState } from 'react';

export default function CreatePost(props: any) {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');

  return (
    <>
      <div className="  font-para-med ">
        <div className=" w-full  rounded-lg bg-purple-component p-4 px-7 font-para-med shadow-lg ">
          <div className="flex flex-row gap-3 pb-2">
            <div>
              {currentUser == null ? (
                <FaUserCircle size="2em" />
              ) : (
                currentUser.coverPhoto
              )}
            </div>

            <div>
              <h1 className="font-para-heavy text-2xl font-bold">
                Create a Post{' '}
              </h1>
              <h4>Write anything to your heart's content</h4>
            </div>
          </div>
          <div>
            <form>
              <textarea
                id="message"
                className="   w-full  rounded-lg bg-purple-text-area p-1 text-sm text-white shadow-lg  "
                placeholder="Write text here..."
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </form>
          </div>

          <div className="flex justify-end">
            <button
              className="flex grow justify-end  "
              onClick={() => props.getText(message)}
            >
              <PostButton></PostButton>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
