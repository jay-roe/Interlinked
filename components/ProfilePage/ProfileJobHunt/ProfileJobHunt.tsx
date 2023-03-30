import type { Dispatch, SetStateAction } from 'react';
import Button from '@/components/Buttons/Button';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import CheckBox from '@/components/InputFields/CheckBox/CheckBox';
import JobHuntIcon from '@/components/Icons/JobHuntIcon/JobHuntIcon';

export default function ProfileJobHunt({
  isEditable = false,
  isWantJobNotif,
  setIsWantJobNotif,
  jobNotifEditing = false,
  setJobNotifEditing,
}: {
  isEditable?: boolean;
  isWantJobNotif: boolean;
  setIsWantJobNotif?: Dispatch<SetStateAction<boolean>>;
  jobNotifEditing?: boolean;
  setJobNotifEditing?: Dispatch<SetStateAction<boolean>>;
}) {
  // does not appear in live version

  // editable version
  return (
    <div className="flex flex-row">
      {!jobNotifEditing ? (
        <div className="flex">
          <div className="mt-2 mb-3 flex flex-wrap items-center justify-between rounded-xl bg-white bg-opacity-[8%] p-4">
            <JobHuntIcon isWantJobNotif={isWantJobNotif} />
          </div>
          <EditButton
            data-testid="job-hunt-edit-button"
            onClick={() => setJobNotifEditing((curr) => !curr)}
          />
        </div>
      ) : (
        <div className="mt-2 mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-4">
          <form
            className=""
            onSubmit={(e) => {
              e.preventDefault();
              setJobNotifEditing((curr) => !curr);
            }}
          >
            <div className="">
              <label>
                <JobHuntIcon isWantJobNotif={isWantJobNotif} />
              </label>
              <div className="mt-3 flex items-center gap-3">
                <CheckBox
                  name="jobHunt"
                  label="Receive Job Notifications"
                  checked={isWantJobNotif}
                  onChange={(e) => setIsWantJobNotif(e.target.checked)}
                />
              </div>
              <div>
                <Button className="mt-3" type="submit">
                  Save Job Notification Settings
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
