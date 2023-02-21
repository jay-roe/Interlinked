'use client';

import { useAuth } from '@/contexts/AuthContext';
import ProfileHeading from '@/components/ProfilePage/ProfileHeading/ProfileHeading';
import ProfileContact from '@/components/ProfilePage/ProfileContact/ProfileContact';
import LinkButton from '@/components/Buttons/LinkButton/LinkButton';
import ProfileLanguages from '@/components/ProfilePage/ProfileLanguages/ProfileLanguages';
import ProfileCodingLanguages from '@/components/ProfilePage/ProfileCodingLanguages/ProfileCodingLanguages';
import ProfileEducation from '@/components/ProfilePage/ProfileEducation/ProfileEducation';
import ProfileCourses from '@/components/ProfilePage/ProfileCourses/ProfileCourses';
import ProfileExperience from '@/components/ProfilePage/ProfileExperience/ProfileExperience';
import ProfileProjects from '@/components/ProfilePage/ProfileProjects/ProfileProjects';
import ProfileSkills from '@/components/ProfilePage/ProfileSkills/ProfileSkills';
import ProfileAwards from '@/components/ProfilePage/ProfileAwards/ProfileAwards';

import Link from 'next/link';
import SocialIconGroup from '@/components/Icons/SocialIconGroup/SocialIconGroup';
import Button from '@/components/Buttons/Button';
import CreatePostGroup from '@/components/CreatePostGroup/CreatePostGroup';

export default function PreviewProfile() {
  const { currentUser } = useAuth();

  // User not logged in, can't preview
  if (!currentUser) {
    return (
      <>
        <h1>Your Profile</h1>
        <h2 data-testid="profile-login-prompt">
          You must be logged in to preview your profile.
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

  // Profile preview
  return (
    <div className="container mx-auto text-white">
      <ProfileHeading
        profilePictureURL={currentUser.profilePicture}
        name={currentUser.name}
        bio={currentUser.bio}
      />
      <div className="mx-auto mb-5">
        <SocialIconGroup socials={currentUser.socials} />
      </div>
      <LinkButton currentUser={currentUser} />

      <h1 className="text-2xl font-extrabold">
        Link with {currentUser.name?.split(' ')[0]}
      </h1>
      <ProfileContact email={currentUser.email} phone={currentUser.phone} />

      <h2 className="text-2xl font-extrabold">Languages 🗨 </h2>
      <ProfileLanguages languages={currentUser.languages} />

      {/* TODO: change coding languages picture */}
      <h2 className="text-2xl font-extrabold">Coding Languages 🗨 </h2>
      <ProfileCodingLanguages codingLanguages={currentUser.codingLanguages} />

      <h2 className="text-2xl font-extrabold">Education 🏫 </h2>
      <ProfileEducation education={currentUser.education} />

      <h2 className="text-2xl font-extrabold">Courses 📚</h2>
      <ProfileCourses courses={currentUser.courses} />

      <h2 className="text-2xl font-extrabold">Experience 🏢</h2>
      <ProfileExperience experience={currentUser.experience} />

      <h2 className="text-2xl font-extrabold">Projects 🛠</h2>
      <ProfileProjects projects={currentUser.projects} />

      <h2 className="text-2xl font-extrabold">Skills 💪</h2>
      <ProfileSkills skills={currentUser.skills} />

      <h2 className="text-2xl font-extrabold">Awards 🏆</h2>
      <ProfileAwards awards={currentUser.awards} />
    </div>
  );
}
