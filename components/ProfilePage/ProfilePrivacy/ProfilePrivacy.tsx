import type { User } from '@/types/User';
import type { Dispatch, SetStateAction } from 'react';
import Button from '@/components/Buttons/Button';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import PrivacyIcon from '@/components/Icons/PrivacyIcon/PrivacyIcon';
import { setPriority } from 'os';

export default function ProfilePrivacy({
  isEditable = false,
  isPrivate,
  setIsPrivate,
  privacyEditing = false,
  setPrivacyEditing,
}: {
  isEditable?: boolean;
  isPrivate: boolean;
  setIsPrivate?: Dispatch<SetStateAction<boolean>>;
  privacyEditing?: boolean;
  setPrivacyEditing?: Dispatch<SetStateAction<boolean>>;
}) {
  // live version
  if (!isEditable) {
    return (
      <div className="mx-auto mb-5">
        <PrivacyIcon isPrivate={isPrivate} />
      </div>
    );
  }

  // editable version
  return (
    <div className="flex flex-row">
      {!privacyEditing ? (
        <div className="flex">
          <div className="mt-2 mb-3 flex flex-wrap items-center justify-between rounded-xl bg-white bg-opacity-[8%] p-4">
            <PrivacyIcon isPrivate={isPrivate} />
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
                <PrivacyIcon isPrivate={isPrivate} />
              </label>
              <div className="mt-3 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  value="Change Privacy Settings"
                  onChange={() => setIsPrivate((curr) => !curr)}
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
