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

import Link from '@/components/Link/Link';

import SocialIconGroup from '@/components/Icons/SocialIconGroup/SocialIconGroup';
import Button from '@/components/Buttons/Button';
import ProfileVolunteering from '@/components/ProfilePage/ProfileVolunteering/ProfileVolunteering';
import ProfileCertifications from '@/components/ProfilePage/ProfileCertifications/ProfileCertifications';
import ProfilePrivacy from '@/components/ProfilePage/ProfilePrivacy/ProfilePrivacy';
import ProfileDocuments from '@/components/ProfilePage/ProfileDocuments/ProfileDocuments';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PreviewProfile() {
  const t = useTranslations('PreviewProfile');
  const { currentUser, authUser } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  // if account is locked or timed out, redirect to locked page
  useEffect(() => {
    if (currentUser?.accountLocked || currentUser?.accountTimeout) {
      router.push('/' + locale + '/locked');
    }
  }, [currentUser, router]);

  // User not logged in, redirect to account required
  if (!currentUser) {
    router.push('/' + locale + '/account-required');
    return <div> </div>;
  }

  if (currentUser.isCompany) {
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
      </div>
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

      <ViewLinkButton
        href={`/profile/${authUser.uid}/links`}
        linkedUserIds={currentUser?.linkedUserIds}
        data-testid="view-link-button"
      />

      <ProfileContact email={currentUser.email} phone={currentUser.phone} />

      <ProfileDocuments
        resume={currentUser.resume}
        coverLetter={currentUser.coverLetter}
      />

      {/* The check is done on each section to make it less confusing to change the visibility of one of the profile components if we want to */}

      <ProfileLanguages languages={currentUser.languages} />

      <ProfileCodingLanguages codingLanguages={currentUser.codingLanguages} />

      <ProfileEducation education={currentUser.education} />

      <ProfileCourses courses={currentUser.courses} />

      <ProfileExperience experience={currentUser.experience} />

      <ProfileProjects projects={currentUser.projects} />

      <ProfileSkills skills={currentUser.skills} />

      <ProfileAwards awards={currentUser.awards} />

      <ProfileCertifications certifications={currentUser.certifications} />

      <ProfileVolunteering volunteering={currentUser.volunteering} />
    </div>
  );
}
