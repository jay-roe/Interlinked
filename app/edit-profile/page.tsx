/* eslint-disable @next/next/no-img-element */
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import DeleteAccountPopup from '@/components/DeleteAccountPopup/DeleteAccountPopup';
import { useRouter } from 'next/navigation';
import SocialIconGroup from '@/components/Icons/SocialIconGroup/SocialIconGroup';

import type { User } from '@/types/User';

import ProfileHeading from '@/components/ProfilePage/ProfileHeading/ProfileHeading';
import ProfileContact from '@/components/ProfilePage/ProfileContact/ProfileContact';
import LinkButton from '@/components/Buttons/LinkButton/LinkButton';
import ProfileLanguages from '@/components/ProfilePage/ProfileLanguages/ProfileLanguages';
import ProfileEducation from '@/components/ProfilePage/ProfileEducation/ProfileEducation';
import ProfileCourses from '@/components/ProfilePage/ProfileCourses/ProfileCourses';
import ProfileExperience from '@/components/ProfilePage/ProfileExperience/ProfileExperience';
import ProfileProjects from '@/components/ProfilePage/ProfileProjects/ProfileProjects';
import ProfileSkills from '@/components/ProfilePage/ProfileSkills/ProfileSkills';
import ProfileAwards from '@/components/ProfilePage/ProfileAwards/ProfileAwards';
import Link from 'next/link';

import { db } from '@/config/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import Button from '@/components/Buttons/Button';
import { storage } from '@/config/firebase';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

export default function EditProfile() {
  const router = useRouter();

  const { currentUser, authUser, deleteAccount, refresh } = useAuth();

  const [isModalShow, setIsModalShow] = useState(false);

  // Profile component states
  const [profilePicture, setProfilePicture] = useState<File>();
  const [profilePictureURL, setProfilePictureURL] = useState<string>(
    currentUser?.profilePicture
  );

  // Preview uploaded profile picture before posting to database
  useEffect(() => {
    if (!profilePicture) {
      return;
    }

    const objectUrl = URL.createObjectURL(profilePicture);
    setProfilePictureURL(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [profilePicture]);

  const [name, setName] = useState<string>(currentUser?.name);
  const [nameEditing, setNameEditing] = useState<boolean>(false);

  const [bio, setBio] = useState<string>(currentUser?.bio);
  const [bioEditing, setBioEditing] = useState<boolean>(false);
  const [languages, setLanguage] = useState<string[]>(currentUser?.languages);
  const [languageEditing, setLanguageEditing] = useState<boolean>(false);

  //Education component states
  const [education, setEducation] = useState<User['education']>(
    currentUser?.education
  );
  const [educationEditing, setEducationEditing] = useState<boolean[]>(
    currentUser?.education.map(() => false)
  );

  // User not logged in
  if (!currentUser || !authUser) {
    return (
      <div className="text-white">
        <h1 className="text-lg font-bold">Your Profile</h1>
        <h2 data-testid="profile-login-prompt">
          You must be logged in to edit your profile.
        </h2>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/register">
          <Button>Register</Button>
        </Link>
      </div>
    );
  }

  const statesToUpdate: Partial<User> = {
    name: name,
    bio: bio,
    languages: languages,
    education: education.filter((_, i) => !educationEditing[i]),
  };

  async function uploadProfilePicture() {
    const profilePictureRef = ref(
      storage,
      `users/${authUser.uid}/profilePicture/${profilePicture.name}`
    );

    // Remove previous profile picture
    if (currentUser.profilePicture) {
      const oldProfilePictureRef = ref(storage, currentUser.profilePicture);
      await deleteObject(oldProfilePictureRef);
    }

    // Upload new profile picture, update database with new link
    await uploadBytes(profilePictureRef, profilePicture);
    statesToUpdate.profilePicture = await getDownloadURL(profilePictureRef);
  }

  async function updateAccount() {
    const save = confirm('Unsaved changes will be lost. Continue?');
    if (!save) {
      return;
    }
    try {
      await uploadProfilePicture();
      console.log(statesToUpdate);

      await updateDoc(doc(db.users, authUser.uid), statesToUpdate);
      alert('Successfully updated your profile!');
      await refresh();
      router.push('/profile');
    } catch (err) {
      console.error(err);
    }
  }

  async function onDeleteAccount() {
    try {
      await deleteAccount();

      // Redirect to home page, with state saying account was just deleted
      router.push('/'); // TODO reintroduce deleted account alert, { state: { deletedAccount: true } });
      setIsModalShow(false);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  // User logged in
  return (
    <div className="container mx-auto text-white">
      <div className="mb-2 flex justify-between">
        <h1 className="text-3xl font-extrabold">Edit Profile</h1>
        <Button data-testid="update-account-button" onClick={updateAccount}>
          Save Changes
        </Button>
      </div>
      <div className="mb-3 rounded-xl bg-white bg-opacity-[8%] p-5">
        <ProfileHeading
          isEditable
          profilePictureURL={profilePictureURL}
          setProfilePicture={setProfilePicture}
          name={name}
          setName={setName}
          nameEditing={nameEditing}
          setNameEditing={setNameEditing}
          bio={bio}
          setBio={setBio}
          bioEditing={bioEditing}
          setBioEditing={setBioEditing}
        />

        <div className="mx-auto mb-3">
          <SocialIconGroup socials={currentUser.socials} />
        </div>
        <LinkButton currentUser={currentUser} />

        <h1 className="text-2xl font-extrabold">
          Link with {currentUser.name?.split(' ')[0]}
        </h1>
        <ProfileContact currentUser={currentUser} />

        <h2 className="inline-block text-2xl font-extrabold">Languages 🗨 </h2>
        <ProfileLanguages
          isEditable
          languages={languages}
          languageEditing={languageEditing}
          setLanguage={setLanguage}
          setLanguageEditing={setLanguageEditing}
        />

        <h2 className="text-2xl font-extrabold">Education 🏫 </h2>
        <ProfileEducation
          education={education}
          isEditable
          educationEditing={educationEditing}
          setEducation={setEducation}
          setEducationEditing={setEducationEditing}
        />

        <h2 className="text-2xl font-extrabold">Courses 📚</h2>
        <ProfileCourses currentUser={currentUser} />

        <h2 className="text-2xl font-extrabold">Experience 🏢</h2>
        <ProfileExperience currentUser={currentUser} />

        <h2 className="text-2xl font-extrabold">Projects 🛠</h2>
        <ProfileProjects currentUser={currentUser} />

        <h2 className="text-2xl font-extrabold">Skills 💪</h2>
        <ProfileSkills currentUser={currentUser} />

        <h2 className="text-2xl font-extrabold">Awards 🏆</h2>
        <ProfileAwards currentUser={currentUser} />
      </div>
      <div className="flex justify-end">
        <Button data-testid="update-account-button2" onClick={updateAccount}>
          Save Changes
        </Button>
      </div>

      <h1 className="mb-3 text-3xl font-extrabold">Manage Profile</h1>
      <p className="mb-1">
        We&apos;re sorry to see you go. Click the button below to permanently
        delete your account and all of its information.
      </p>
      <Button
        data-testid="danger-zone"
        className="bg-red-600 hover:bg-red-500"
        onClick={() => setIsModalShow(true)}
      >
        Delete account
      </Button>
      <DeleteAccountPopup
        show={isModalShow}
        onHide={() => setIsModalShow(false)}
        onDeleteAccount={onDeleteAccount}
      />
    </div>
  );
}
