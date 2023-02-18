import type { User } from '@/types/User';
import type { Dispatch, SetStateAction } from 'react';
import Button from '@/components/Buttons/Button';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import InputField from '@/components/InputFields/Input/Input';

export default function ProfileContact({
  currentUser,
  isEditable = false,
  email,
  setEmail,
  phone,
  setPhone,
  contactEditing = false,
  setContactEditing,
}: {
  currentUser: User;
  isEditable?: boolean;
  email: string;
  setEmail?: (email: string) => void;
  phone?: string;
  setPhone?: (phone: string) => void;
  contactEditing?: boolean;
  setContactEditing?: Dispatch<SetStateAction<boolean>>;
}) {
  if (!isEditable) {
    return (
      <div className="mt-2 mb-3 flex w-fit flex-col items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-4">
        <div className="flex">
          {currentUser.email && (
            <p>
              ✉ <a href={`mailto:${currentUser.email}`}>{currentUser.email}</a>{' '}
              {/* TODO: Add to edit profile: <VerifiedIcon verified={authUser.emailVerified} showText /> */}
            </p>
          )}
        </div>
        {currentUser.phone && (
          <div className="mt-2 flex">
            <p>
              📞 <a href={`telno:${currentUser.phone}`}>{currentUser.phone}</a>
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <form
        action=""
        className="mt-2 mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-4"
        onSubmit={(e) => {
          e.preventDefault();
          setContactEditing((curr) => !curr);
        }}
      >
        {contactEditing && (
          <div>
            <label>
              Email <span className="text-yellow-600">*</span>
            </label>
            <InputField
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>
              Phone <span className="text-yellow-600"></span>
            </label>
            <InputField
              type="tel"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
        <div className="flex flex-col">
          {/*Ensure that email address is valid + make sure not empty*/}
          {!contactEditing && (
            <p>
              ✉ <a href={`mailto:${email}`}>{email}</a>{' '}
              {/* TODO: Add to edit profile: <VerifiedIcon verified={authUser.emailVerified} showText /> */}
            </p>
          )}
          {!contactEditing && phone && (
            <div className="mt-2 flex">
              <p>
                📞 <a href={`telno:${phone}`}>{phone}</a>
              </p>
            </div>
          )}
          {contactEditing && (
            <div>
              <Button type="submit">Save Contacts</Button>
            </div>
          )}
        </div>
      </form>
      <div className="flex">
        {isEditable && !contactEditing && (
          <EditButton
            className="inline"
            onClick={() => setContactEditing((curr) => !curr)}
          />
        )}
      </div>
    </div>
  );
}
