'use client';

import { useAuth } from '@/contexts/AuthContext';
import SocialIconGroup from '@/components/SocialIconGroup/SocialIconGroup';
import ProfileHeading from '@/components/ProfilePage/ProfileHeading/ProfileHeading';
import ProfileContact from '@/components/ProfilePage/ProfileContact/ProfileContact';
import LinkButton from '@/components/LinkButton/LinkButton';
import ProfileLanguages from '@/components/ProfilePage/ProfileLanguages/ProfileLanguages';
import ProfileEducation from '@/components/ProfilePage/ProfileEducation/ProfileEducation';
import ProfileCourses from '@/components/ProfilePage/ProfileCourses/ProfileCourses';
import ProfileExperience from '@/components/ProfilePage/ProfileExperience/ProfileExperience';
import ProfileProjects from '@/components/ProfilePage/ProfileProjects/ProfileProjects';
import ProfileSkills from '@/components/ProfilePage/ProfileSkills/ProfileSkills';
import ProfileAwards from '@/components/ProfilePage/ProfileAwards/ProfileAwards';
import Button from '@/components/Button/Button';
import Link from 'next/link';

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
      <ProfileHeading currentUser={currentUser} bio={currentUser.bio} />
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
  );
}
