import SocialIconGroup from '@/components/Icons/SocialIconGroup/SocialIconGroup';
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
import { db } from '@/config/firestore';
import { doc, getDoc } from 'firebase/firestore';
import ProfileVolunteering from '@/components/ProfilePage/ProfileVolunteering/ProfileVolunteering';
import ProfileCertifications from '@/components/ProfilePage/ProfileCertifications/ProfileCertifications';
import ProfileCodingLanguages from '@/components/ProfilePage/ProfileCodingLanguages/ProfileCodingLanguages';

async function getUser(uid: string) {
  const res = await getDoc(doc(db.users, uid));
  return res.data();
}

export default async function ViewProfile({ params }) {
  const user = await getUser(params.uid);
  if (!user || !user.name || !user.email)
    return <h1 className="text-2xl font-extrabold">Invalid User.</h1>;

  return (
    <div data-testid="profile" className="container mx-auto text-white">
      <ProfileHeading
        profilePictureURL={user.profilePicture}
        name={user.name}
        bio={user.bio}
      />
      <div className="mx-auto mb-3">
        <SocialIconGroup socials={user?.socials} />
      </div>

      <LinkButton href={`/profile/${params.uid}/links`} currentUser={user} />

      <ProfileContact email={user.email} phone={user.phone} />

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
