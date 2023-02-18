import EditButton from '@/components/Buttons/EditButton/EditButton';
import Input from '@/components/InputFields/Input/Input';
import type { User } from '@/types/User';
import type { Dispatch, SetStateAction } from 'react';

/* eslint-disable @next/next/no-img-element */

/**
 * Creates profile heading (profile picture, name, bio).
 * @param currentUser User object
 * @param bio Bio field of desired user
 * @param isEditable True when user has edit permissions
 * @param bioEditing Controls when text input is rendered instead of text output
 */
export default function ProfileHeading({
  currentUser,
  isEditable = false,
  name,
  nameEditing = false,
  setName,
  setNameEditing,
  bio,
  bioEditing = false,
  setBio,
  setBioEditing,
}: {
  currentUser: User;
  isEditable?: boolean;
  name: string;
  nameEditing?: boolean;
  setName?: (name: string) => void;
  setNameEditing?: Dispatch<SetStateAction<boolean>>;
  bio: string;
  bioEditing?: boolean;
  setBio?: (bio: string) => void;
  setBioEditing?: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="mb-5 block min-h-full gap-5 md:flex md:max-w-xl">
      {currentUser.profilePicture && (
        <div className="row-auto">
          <div className="relative m-auto w-fit">
            <img
              className="h-40 w-40 max-w-none rounded-full"
              src={currentUser.profilePicture}
              alt={currentUser?.name}
            />
            {isEditable && (
              <div>
                <input
                  accept="image/*"
                  id="upload-profile-picture"
                  type="file"
                  style={{ display: 'none' }}
                />
                <label htmlFor="upload-profile-picture">
                  <EditButton className="absolute -right-4 -bottom-4" />
                </label>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="row-auto place-self-start self-center text-center md:min-w-[80%] md:text-left">
        <div className="flex items-center">
          {nameEditing ? (
            <Input
              type="text"
              className="text-3xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <h1
              data-testid="profile-title"
              className="m-auto text-3xl font-extrabold md:m-0"
            >
              {name || 'No name provided.'}
            </h1>
          )}
          {isEditable && (
            <EditButton onClick={() => setNameEditing((curr) => !curr)} />
          )}
        </div>
        <div className="flex items-center">
          {bioEditing ? (
            <textarea
              data-testid="bio-editing"
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
