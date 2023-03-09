import { User } from '@/types/User';
import { MdOutlinePublic } from 'react-icons/md';
import { MdOutlinePublicOff } from 'react-icons/md';

export default function PrivacyIcon({ privacy }: { privacy: boolean }) {
  return (
    <div
      data-testid="privacy"
      className="flex flex-wrap items-center justify-center gap-2 md:justify-start "
    >
      {privacy && ( //Private acc
        <div className="justify-between">
          <MdOutlinePublicOff size={30} />
          <div className="ml-2 self-center">
            <p>Your profile is private</p>
          </div>
        </div>
      )}
      {!privacy && ( //Public acc
        <div className="flex items-center justify-between gap-2">
          <MdOutlinePublic size={30} />
          Your profile is public
        </div>
      )}
    </div>
  );
}
