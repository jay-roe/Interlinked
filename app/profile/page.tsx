'use client';

import { useAuth } from '@/contexts/AuthContext';
import ProfileHeading from '@/components/ProfilePage/ProfileHeading/ProfileHeading';
import ProfileContact from '@/components/ProfilePage/ProfileContact/ProfileContact';
import ViewLinkButton from '@/components/Buttons/LinkButton/ViewLinkButton';
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
import ProfileVolunteering from '@/components/ProfilePage/ProfileVolunteering/ProfileVolunteering';
import ProfileCertifications from '@/components/ProfilePage/ProfileCertifications/ProfileCertifications';
import ProfilePrivacy from '@/components/ProfilePage/ProfilePrivacy/ProfilePrivacy';

export default function PreviewProfile() {
  const { currentUser, authUser } = useAuth();

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
    <div className="container mx-auto text-white" data-testid="profile-info">
      <ProfileHeading
        profilePictureURL={currentUser.profilePicture}
        name={currentUser.name}
        bio={currentUser.bio}
        uid={''}
      />

      <ProfilePrivacy isPrivate={currentUser.isPrivate} />

      <div className="mx-auto mb-5">
        <SocialIconGroup socials={currentUser.socials} />
      </div>

      {!currentUser.isCompany && (
        <ViewLinkButton
          href={`/profile/${authUser.uid}/links`}
          linkedUserIds={currentUser?.linkedUserIds}
          data-testid="view-link-button"
        />
      )}

      <ProfileContact email={currentUser.email} phone={currentUser.phone} />

      {/* The check is done on each section to make it less confusing to change the visibility of one of the profile components if we want to */}
      {!currentUser.isCompany && (
        <ProfileLanguages languages={currentUser.languages} />
      )}

      {/* TODO: change coding languages picture */}
      {!currentUser.isCompany && (
        <ProfileCodingLanguages codingLanguages={currentUser.codingLanguages} />
      )}

      {!currentUser.isCompany && (
        <ProfileEducation education={currentUser.education} />
      )}

      {!currentUser.isCompany && (
        <ProfileCourses courses={currentUser.courses} />
      )}

      {!currentUser.isCompany && (
        <ProfileExperience experience={currentUser.experience} />
      )}

      {!currentUser.isCompany && (
        <ProfileProjects projects={currentUser.projects} />
      )}

      {!currentUser.isCompany && <ProfileSkills skills={currentUser.skills} />}

      {!currentUser.isCompany && <ProfileAwards awards={currentUser.awards} />}

      {!currentUser.isCompany && (
        <ProfileCertifications certifications={currentUser.certifications} />
      )}

      {!currentUser.isCompany && (
        <ProfileVolunteering volunteering={currentUser.volunteering} />
      )}
    </div>
  );
}
