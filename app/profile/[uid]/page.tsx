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

async function getUser(uid: string) {
  const res = await getDoc(doc(db.users, uid));
  return res.data();
}

export default async function ViewProfile({ params }) {
  const user = await getUser(params.uid);
  if (!user || !user.name || !user.email)
    return <h1 className="text-2xl font-extrabold">Invalid User.</h1>;

  return (
    <div className="container mx-auto text-white">
      <ProfileHeading currentUser={user} bio={user.bio} />
      <div className="mx-auto mb-3">
        <SocialIconGroup socials={user?.socials} />
      </div>
      <LinkButton currentUser={user} />

      <h1 className="text-2xl font-extrabold">
        Link with {user?.name?.split(' ')[0]}
      </h1>
      <ProfileContact currentUser={user} />

      <h2 className="text-2xl font-extrabold">Languages 🗨 </h2>
      <ProfileLanguages currentUser={user} />

      <h2 className="text-2xl font-extrabold">Education 🏫 </h2>
      <ProfileEducation currentUser={user} />

      <h2 className="text-2xl font-extrabold">Courses 📚</h2>
      <ProfileCourses currentUser={user} />

      <h2 className="text-2xl font-extrabold">Experience 🏢</h2>
      <ProfileExperience currentUser={user} />

      <h2 className="text-2xl font-extrabold">Projects 🛠</h2>
      <ProfileProjects currentUser={user} />

      <h2 className="text-2xl font-extrabold">Skills 💪</h2>
      <ProfileSkills currentUser={user} />

      <h2 className="text-2xl font-extrabold">Awards 🏆</h2>
      <ProfileAwards currentUser={user} />
    </div>
  );
}
