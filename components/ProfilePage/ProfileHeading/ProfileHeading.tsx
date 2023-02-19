import EditButton from '@/components/Buttons/EditButton/EditButton';
import Input from '@/components/InputFields/Input/Input';
import type { User } from '@/types/User';
import type { Dispatch, SetStateAction } from 'react';
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';

/* eslint-disable @next/next/no-img-element */

/**
 * Creates profile heading (profile picture, name, bio).
 * @param currentUser User object
 * @param bio Bio field of desired user
 * @param isEditable True when user has edit permissions
 * @param bioEditing Controls when text input is rendered instead of text output
 */
export default function ProfileHeading({
  isEditable = false,
  profilePictureURL,
  setProfilePicture,
  name,
  nameEditing = false,
  setName,
  setNameEditing,
  bio,
  bioEditing = false,
  setBio,
  setBioEditing,
}: {
  isEditable?: boolean;
  profilePictureURL: string;
  setProfilePicture?: Dispatch<SetStateAction<File>>;
  name: string;
  nameEditing?: boolean;
  setName?: (name: string) => void;
  setNameEditing?: Dispatch<SetStateAction<boolean>>;
  bio: string;
  bioEditing?: boolean;
  setBio?: (bio: string) => void;
  setBioEditing?: Dispatch<SetStateAction<boolean>>;
}) {
  // Set profile picture preview if not empty file
  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const images = Array.from(event.target.files);
    if (!images || !images[0]) {
      return;
    }

    setProfilePicture(images[0]);
    console.log(images[0]);
  };

  return (
    <div className="mb-5 block min-h-full gap-5 md:flex md:max-w-xl">
      {profilePictureURL && (
        <div className="row-auto">
          <div className="relative m-auto w-fit">
            {isEditable ? (
              <div>
                <input
                  accept="image/*"
                  id="upload-profile-picture"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileSelected}
                />
                <label htmlFor="upload-profile-picture">
                  <img
                    className="h-40 w-40 max-w-none rounded-full"
                    src={profilePictureURL}
                    alt={name || 'Profile Picture'}
                  />
                  <FaRegEdit
                    className="absolute -right-4 -bottom-4 p-2 text-yellow-600"
                    size={45}
                  />
                </label>
              </div>
            ) : (
              <img
                className="h-40 w-40 max-w-none rounded-full"
                src={profilePictureURL}
                alt={name || 'Profile Picture'}
              />
            )}
          </div>
        </div>
      )}
      <div className="row-auto place-self-start self-center text-center md:min-w-[80%] md:text-left">
        <div className="flex items-center">
          {nameEditing ? (
            <Input
              type="text"
              data-testid="change-name"
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
            <EditButton
              data-testid="name-edit-button"
              onClick={() => setNameEditing((curr) => !curr)}
            />
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
              data-testid="bio-edit-button"
              className="inline"
              onClick={() => setBioEditing((curr) => !curr)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
