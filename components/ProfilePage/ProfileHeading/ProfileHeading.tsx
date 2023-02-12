import EditButton from '@/components/EditButton/EditButton';
import type { User } from '@/types/User';
import type { Dispatch, SetStateAction } from 'react';

/* eslint-disable @next/next/no-img-element */
export default function ProfileHeading({
  currentUser,
  isEditable = false,
  bioEditing = false,
  bio,
  setBioEditing,
  setBio,
}: {
  currentUser: User;
  isEditable?: boolean;
  bioEditing?: boolean;
  bio: string;
  setBioEditing?: Dispatch<SetStateAction<boolean>>;
  setBio?: (bio: string) => void;
}) {
  return (
    <div className="mb-5 block min-h-full gap-5 md:flex md:max-w-xl">
      {currentUser.profilePicture && (
        <div className="row-auto">
          <img
            className="m-auto h-40 w-40 max-w-none rounded-full"
            src={currentUser.profilePicture}
            alt={currentUser?.name}
          />
        </div>
      )}
      <div className="row-auto place-self-start self-center text-center md:min-w-[80%] md:text-left">
        <h1 data-testid="profile-title" className="text-3xl font-extrabold">
          {currentUser?.name || 'No name provided.'}
        </h1>
        <div className="flex">
          {bioEditing ? (
            <textarea
              className="mb-2 mt-2 block min-h-[75px] w-full appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              name="bio"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          ) : (
            <p>{bio || 'No bio given.'}</p>
          )}
          {isEditable && (
            <EditButton
              className="inline"
              onClick={() => setBioEditing((curr) => !curr)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
