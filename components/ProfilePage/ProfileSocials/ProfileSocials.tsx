import type { User } from '@/types/User';
import type { Dispatch, SetStateAction } from 'react';
import InputField from '@/components/InputFields/Input/Input';
import SocialIcon from '@/components/Icons/SocialIcon/SocialIcon';
import SocialIconGroup from '../../Icons/SocialIconGroup/SocialIconGroup';
import Button from '@/components/Buttons/Button';
import EditButton from '@/components/Buttons/EditButton/EditButton';

export default function ProfileSocials({
  isEditable,
  socials,
  setSocials,
  socialsEditing,
  setSocialsEditing,
}: {
  isEditable?: boolean;
  socials?: User['socials'];
  setSocials?: Dispatch<SetStateAction<User['socials']>>;
  socialsEditing?: boolean;
  setSocialsEditing?: Dispatch<SetStateAction<boolean>>;
}) {
  if (!isEditable) {
    return (
      <div className="mx-auto mb-5">
        <SocialIconGroup socials={socials} />
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <form
        className="mt-2 mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-4"
        onSubmit={(e) => {
          e.preventDefault();
          setSocialsEditing((curr) => !curr);
        }}
      >
        {/*If you're not editing AND at least one social exists, show it */}
        {!socialsEditing &&
          socials &&
          Object.keys(socials).some((social) => socials[social].length > 0) && (
            <SocialIconGroup socials={socials} />
          )}

        {/*If you're not editing AND ALL socials are empty, show "No socials given" */}
        {!socialsEditing &&
          socials &&
          Object.keys(socials).every(
            (social) => socials[social].length === 0
          ) && <p>No socials given</p>}

        {socialsEditing && (
          <div>
            <label>
              <SocialIcon social="github" />
            </label>
            <InputField
              type="text"
              name="github"
              id="githubLink"
              value={socials?.github}
              onChange={(e) =>
                setSocials((socials) => {
                  let tempObj = { ...socials };
                  tempObj.github = e.target.value;
                  return tempObj;
                })
              }
            />
            <label>
              <SocialIcon social="instagram" />
            </label>
            <InputField
              type="text"
              name="instagram"
              id="instagramLink"
              value={socials?.instagram}
              onChange={(e) =>
                setSocials((socials) => {
                  let tempObj = { ...socials };
                  tempObj.instagram = e.target.value;
                  return tempObj;
                })
              }
            />
            <div>
              <Button className="mt-3" type="submit">
                Save Socials
              </Button>
            </div>
          </div>
        )}
      </form>
      <div className="flex">
        {isEditable && !socialsEditing && (
          <EditButton
            className="inline"
            onClick={() => setSocialsEditing((curr) => !curr)}
          />
        )}
      </div>
    </div>
  );
}
