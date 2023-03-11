import { User } from '@/types/User';
import { MdOutlinePublic } from 'react-icons/md';
import { MdOutlinePublicOff } from 'react-icons/md';

export default function PrivacyIcon({ isPrivate }: { isPrivate: boolean }) {
  return (
    <div
      data-testid="privacy"
      className="flex flex-wrap items-center justify-center gap-2 md:justify-start "
    >
      {isPrivate ? ( //Private acc
        <div className="flex items-center justify-between gap-2">
          <MdOutlinePublicOff size={30} />
          <div className="ml-2 self-center">
            <p>Your profile is private</p>
          </div>
        </div>
      ) : (
        //Public acc
        <div className="flex items-center justify-between gap-2">
          <MdOutlinePublic size={30} />
          <div className="ml-2 self-center">
            <p>Your profile is public</p>
          </div>
        </div>
      )}
    </div>
  );
}
