import LinkButton from '@/components/Buttons/LinkButton/LinkButton';
import type { User } from '@/types/User';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('Profile.Locked');
  return (
    <div className="container mx-auto text-white">
      <ProfileHeading
        name={name}
        profilePictureURL={profilePictureURL}
        bio={bio}
      />
      <LinkButton profileOwnerUID={userID} />
      <div className="text-center">
        <h1 className="text-3xl font-extrabold">{t('private-account')}</h1>
        <h2 className="mb-3">
          {t('send')} <b>{name}</b> {t('link-req-to-view-profile')}.
        </h2>
        <FaLock className="m-auto" size={70} />
      </div>
    </div>
  );
}
