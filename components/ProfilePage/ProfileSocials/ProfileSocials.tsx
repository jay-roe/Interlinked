import type { User } from '@/types/User';
import SocialIcon from '@/components/Icons/SocialIcon/SocialIcon';
import SocialIconGroup from '../../Icons/SocialIconGroup/SocialIconGroup';

export default function ProfileSocials({
  socials,
  isEditable,
}: {
  socials: User['socials'];
  isEditable?: boolean;
}) {
  if (!isEditable) {
    return (
      <div className="mx-auto mb-3">
        <SocialIconGroup socials={socials} />
      </div>
    );
  }

  return (
    <div className="mx-auto mb-3">
      <SocialIconGroup socials={socials} />
      <SocialIcon social="github" />
    </div>
  );
}
