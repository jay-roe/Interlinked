'use client';

import SocialIconGroup from '@/components/Icons/SocialIconGroup/SocialIconGroup';
import ProfileHeading from '@/components/ProfilePage/ProfileHeading/ProfileHeading';
import ProfileContact from '@/components/ProfilePage/ProfileContact/ProfileContact';
import ViewLinkButton from '@/components/Buttons/LinkButton/ViewLinkButton';
import ProfileLanguages from '@/components/ProfilePage/ProfileLanguages/ProfileLanguages';
import ProfileEducation from '@/components/ProfilePage/ProfileEducation/ProfileEducation';
import ProfileCourses from '@/components/ProfilePage/ProfileCourses/ProfileCourses';
import ProfileExperience from '@/components/ProfilePage/ProfileExperience/ProfileExperience';
import ProfileProjects from '@/components/ProfilePage/ProfileProjects/ProfileProjects';
import ProfileSkills from '@/components/ProfilePage/ProfileSkills/ProfileSkills';
import ProfileAwards from '@/components/ProfilePage/ProfileAwards/ProfileAwards';
import ProfileDocuments from '@/components/ProfilePage/ProfileDocuments/ProfileDocuments';
import { db } from '@/config/firestore';
import { doc, getDoc } from 'firebase/firestore';
import ProfileVolunteering from '@/components/ProfilePage/ProfileVolunteering/ProfileVolunteering';
import ProfileCertifications from '@/components/ProfilePage/ProfileCertifications/ProfileCertifications';
import ProfileCodingLanguages from '@/components/ProfilePage/ProfileCodingLanguages/ProfileCodingLanguages';
import LinkButton from '@/components/Buttons/LinkButton/LinkButton';
import ProfileLocked from '@/components/ProfilePage/ProfileLocked/ProfileLocked';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { User } from '@/types/User';
import LoadingScreen from '@/components/Loading/Loading';
import { useTranslations } from 'next-intl';

export default function ViewProfile({ params }) {
  const t = useTranslations('PreviewProfile.uid');
  const { currentUser, currentAdmin, authUser } = useAuth();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser(uid: string) {
      const res = await getDoc(doc(db.users, uid));
      return res.data();
    }

    getUser(params.uid).then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, [params.uid]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user || !user.name || !user.email)
    return <h1 className="text-2xl font-extrabold">{t('invalid')}</h1>;

  // User is private and not linked with auth user -> Locked out
  // User is currently logged in -> Show normal page
  if (
    user.isPrivate &&
    !currentUser.linkedUserIds?.some(
      (linkedUser) => linkedUser === params.uid
    ) &&
    authUser.uid !== params.uid
  ) {
    return (
      <ProfileLocked
        userID={params.uid}
        name={user.name}
        profilePictureURL={user.profilePicture}
        bio={user.bio}
      />
    );
  }

  // user is a company
  if (user.isCompany) {
    return (
      <div data-testid="profile" className="container mx-auto text-white">
        <ProfileHeading
          profilePictureURL={user.profilePicture}
          name={user.name}
          bio={user.bio}
          uid={params.uid}
        />

        <div className="mx-auto mb-3">
          <SocialIconGroup socials={user?.socials} />
        </div>

        <ProfileContact email={user.email} phone={user.phone} />
      </div>
    );
  }

  return (
    <div data-testid="profile" className="container mx-auto text-white">
      <ProfileHeading
        profilePictureURL={user.profilePicture}
        name={user.name}
        bio={user.bio}
        uid={params.uid}
      />

      <div className="mx-auto mb-3">
        <SocialIconGroup socials={user?.socials} />
      </div>

      <div className="flex space-x-4">
        <ViewLinkButton
          href={`/profile/${params.uid}/links`}
          linkedUserIds={user?.linkedUserIds}
        />
        {!currentAdmin && <LinkButton profileOwnerUID={params.uid} />}
      </div>

      <ProfileContact email={user.email} phone={user.phone} />

      <ProfileDocuments resume={user.resume} coverLetter={user.coverLetter} />

      <ProfileLanguages languages={user.languages} />

      <ProfileCodingLanguages codingLanguages={user.codingLanguages} />

      <ProfileEducation education={user.education} />

      <ProfileCourses courses={user.courses} />

      <ProfileExperience experience={user.experience} />

      <ProfileProjects projects={user.projects} />

      <ProfileSkills skills={user.skills} />

      <ProfileAwards awards={user.awards} />

      <ProfileCertifications certifications={user.certifications} />

      <ProfileVolunteering volunteering={user.volunteering} />
    </div>
  );
}
