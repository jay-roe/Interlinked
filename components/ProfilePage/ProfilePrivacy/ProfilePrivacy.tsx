import type { User } from '@/types/User';
import type { Dispatch, SetStateAction } from 'react';
import InputField from '@/components/InputFields/Input/Input';
import SocialIcon from '@/components/Icons/SocialIcon/SocialIcon';
import SocialIconGroup from '../../Icons/SocialIconGroup/SocialIconGroup';
import Button from '@/components/Buttons/Button';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import PrivacyIcon from '@/components/Icons/PrivacyIcon/PrivacyIcon';
import { setPriority } from 'os';

export default function ProfilePrivacy({
  isEditable = false,
  privacy,
  setPrivacy,
  privacyEditing = false,
  setPrivacyEditing,
}: {
  isEditable?: boolean;
  privacy: boolean;
  setPrivacy?: Dispatch<SetStateAction<boolean>>;
  privacyEditing?: boolean;
  setPrivacyEditing?: Dispatch<SetStateAction<boolean>>;
}) {
  // live version
  if (!isEditable) {
    return (
      <div className="mx-auto mb-5">
        <PrivacyIcon privacy={privacy} />
      </div>
    );
  }

  // editable version
  return (
    <div className="flex flex-row">
      {!privacyEditing ? (
        <div className="flex">
          <div className="mt-2 mb-3 flex flex-wrap items-center justify-between rounded-xl bg-white bg-opacity-[8%] p-4">
            <PrivacyIcon privacy={privacy} />
          </div>
          <EditButton
            data-testid="name-edit-button"
            onClick={() => setPrivacyEditing((curr) => !curr)}
          />
        </div>
      ) : (
        <div className="mt-2 mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-4">
          <form
            className=""
            onSubmit={(e) => {
              e.preventDefault();
              setPrivacyEditing((curr) => !curr);
            }}
          >
            <div className="">
              <label>
                <PrivacyIcon privacy={privacy} />
              </label>
              <div className="mt-3 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  value="Change Privacy Settings"
                  onChange={() => setPrivacy((curr) => !curr)}
                />
                <label htmlFor="privacy">Change Privacy Settings</label>
              </div>
              <div>
                <Button className="mt-3" type="submit">
                  Save Privacy Settings
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
