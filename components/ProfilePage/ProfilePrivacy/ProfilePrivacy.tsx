import type { User } from '@/types/User';
import type { Dispatch, SetStateAction } from 'react';
import InputField from '@/components/InputFields/Input/Input';
import SocialIcon from '@/components/Icons/SocialIcon/SocialIcon';
import SocialIconGroup from '../../Icons/SocialIconGroup/SocialIconGroup';
import Button from '@/components/Buttons/Button';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import PrivacyIcon from '@/components/Icons/PrivacyIcon/PrivacyIcon';

export default function ProfilePrivacy({
  isEditable = false,
  privacy,
  setPrivacy,
  privacyEditing = false,
  setPrivacyEditing,
}: {
  isEditable?: boolean;
  privacy?: boolean;
  setPrivacy?: Dispatch<SetStateAction<boolean>>;
  privacyEditing?: boolean;
  setPrivacyEditing?: Dispatch<SetStateAction<boolean>>;
}) {
  // live version
  if (!isEditable) {
    return (
      <div className="mx-auto mb-5">
        <p>THIS PROFILE IS PUBLIC AF</p>
        <PrivacyIcon privacy={privacy} />
      </div>
    );
  }

  // editable version
  return (
    <div className="flex flex-row">
      {!privacyEditing ? (
        <div className="mt-2 mb-3 flex flex-wrap items-center justify-between rounded-xl bg-white bg-opacity-[8%] p-4">
          <PrivacyIcon privacy={privacy} />
        </div>
      ) : (
        <div className="mt-2 mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-4">
          <form>
            <input type="checkbox" />
          </form>
        </div>
      )}
      {isEditable && (
        <EditButton
          data-testid="name-edit-button"
          onClick={() => setPrivacyEditing((curr) => !curr)}
        />
      )}
    </div>
  );
}
