/* eslint-disable @next/next/no-img-element */
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import DeleteAccountPopup from '@/components/DeleteAccountPopup/DeleteAccountPopup';
import { useRouter } from 'next/navigation';
import SocialIconGroup from '@/components/Icons/SocialIconGroup/SocialIconGroup';
import Button from '@/components/Button/Button';
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

export default function EditProfile() {
  const router = useRouter();

  const { currentUser, authUser, deleteAccount, refresh } = useAuth();

  const [isModalShow, setIsModalShow] = useState(false);

  // Profile component states
  const [bio, setBio] = useState<string>(currentUser?.bio);
  const [bioEditing, setBioEditing] = useState<boolean>(false);

  const statesToUpdate = {
    bio: bio,
  };

  async function updateAccount() {
    try {
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

  // User not logged in
  if (!currentUser || !authUser) {
    return (
      <>
        <h1>Your Profile</h1>
        <h2 data-testid="profile-login-prompt">
          You must be logged in to edit your profile.
        </h2>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/register">
          <Button>Register</Button>
        </Link>
      </>
    );
  }

  // User logged in
  return (
    <div className="container mx-auto text-white">
      <div className="mb-2 flex justify-between">
        <h1 className="text-3xl font-extrabold">Edit Profile</h1>
        <Button onClick={updateAccount}>Save Changes</Button>
      </div>
      <div className="mb-3 rounded-xl bg-white bg-opacity-[8%] p-5">
        <ProfileHeading
          currentUser={currentUser}
          isEditable
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

        <h2 className="text-2xl font-extrabold">Languages 🗨 </h2>
        <ProfileLanguages currentUser={currentUser} />

        <h2 className="text-2xl font-extrabold">Education 🏫 </h2>
        <ProfileEducation currentUser={currentUser} />

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
        <Button onClick={updateAccount}>Save Changes</Button>
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
