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

export default function ViewProfile({ params }) {
  const { currentUser, authUser } = useAuth();
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
    return <h1>Loading...</h1>;
  }

  if (!user || !user.name || !user.email)
    return <h1 className="text-2xl font-extrabold">Invalid User.</h1>;

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

  return (
    <div data-testid="profile" className="container mx-auto text-white">
      {!currentUser.isCompany && (
        <ProfileHeading
          profilePictureURL={user.profilePicture}
          name={user.name}
          bio={user.bio}
          uid={params.uid}
        />
      )}
      {!currentUser.isCompany && (
        <div className="mx-auto mb-3">
          <SocialIconGroup socials={user?.socials} />
        </div>
      )}
      {!currentUser.isCompany && (
        <div className="flex space-x-4">
          <ViewLinkButton
            href={`/profile/${params.uid}/links`}
            linkedUserIds={user?.linkedUserIds}
          />
          <LinkButton profileOwnerUID={params.uid} />
        </div>
      )}
      {!currentUser.isCompany && (
        <ProfileContact email={user.email} phone={user.phone} />
      )}
      {!currentUser.isCompany && (
        <ProfileLanguages languages={user.languages} />
      )}
      {!currentUser.isCompany && (
        <ProfileDocuments
          resume={currentUser.resume}
          coverLetter={currentUser.coverLetter}
        />
      )}
      {!currentUser.isCompany && (
        <ProfileCodingLanguages codingLanguages={user.codingLanguages} />
      )}
      {!currentUser.isCompany && (
        <ProfileEducation education={user.education} />
      )}
      {!currentUser.isCompany && <ProfileCourses courses={user.courses} />}
      {!currentUser.isCompany && (
        <ProfileExperience experience={user.experience} />
      )}
      {!currentUser.isCompany && <ProfileProjects projects={user.projects} />}
      {!currentUser.isCompany && <ProfileSkills skills={user.skills} />}
      {!currentUser.isCompany && <ProfileAwards awards={user.awards} />}
      {!currentUser.isCompany && (
        <ProfileCertifications certifications={user.certifications} />
      )}
      {!currentUser.isCompany && (
        <ProfileVolunteering volunteering={user.volunteering} />
      )}
    </div>
  );
}
