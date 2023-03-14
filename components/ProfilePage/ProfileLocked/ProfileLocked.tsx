import LinkButton from '@/components/Buttons/LinkButton/LinkButton';
import type { User } from '@/types/User';
import { FaLock } from 'react-icons/fa';
import ProfileHeading from '../ProfileHeading/ProfileHeading';

export default function ProfileLocked({
  userID,
  name,
  profilePictureURL,
  bio,
}: {
  userID: string;
  name: User['name'];
  profilePictureURL: User['profilePicture'];
  bio: User['bio'];
}) {
  return (
    <div className="container mx-auto text-white">
      <ProfileHeading
        name={name}
        profilePictureURL={profilePictureURL}
        bio={bio}
      />
      <LinkButton profileOwnerUID={userID} />
      <div className="text-center">
        <h1 className="text-3xl font-extrabold">Private Account</h1>
        <h2 className="mb-3">
          Send <b>{name}</b> a link request to view their profile.
        </h2>
        <FaLock className="m-auto" size={70} />
      </div>
    </div>
  );
}
