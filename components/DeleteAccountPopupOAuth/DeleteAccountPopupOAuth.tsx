import type { DeleteAccountPopupChildProps } from '@/types/DeleteAccountPopup';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FaGoogle } from 'react-icons/fa';
import type { UserCredential } from 'firebase/auth';

import { Dialog } from '@headlessui/react';
import Button from '../Buttons/Button';

export default function DeleteAccountPopupOAuth({
  onHide,
  onDeleteAccount,
}: DeleteAccountPopupChildProps) {
  const [credential, setCredential] = useState<UserCredential>();
  const [isAuthError, setAuthError] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(true);

  const { loginWithGoogle, reauthenticateOAuth } = useAuth();

  // Clear password field before closing modal
  const onHideLocal = () => {
    setOpen(false);
    setCredential(null);
    setAuthError(false);
    onHide();
  };

  const updateCredential = async () => {
    try {
      const tempCredential = await loginWithGoogle();
      setCredential(await reauthenticateOAuth(tempCredential));
    } catch (err) {
      console.error(err);
    }
  };

  // Incorrect password was given if on delete returned false
  const handleDeleteClick = async () => {
    if (!credential) {
      await updateCredential();
    }

    const authError = await onDeleteAccount();
    setAuthError(!authError);
  };

  return (
    <div data-testid="delete-acc-oauth">
      <h5>Please login with one of the methods below.</h5>
      <p className="text-red-500">
        This action is irreversible. Your account, and all of its data, will be
        permanently deleted.
      </p>
      {/* TODO: Add logic to iterate through all providers, giving them the option to reauthenticate how they want. It is possible they have email + Google auth. */}
      <Button onClick={() => updateCredential()}>
        <FaGoogle /> Login with Google
      </Button>
      {isAuthError && (
        <p className="text-red-500">
          Authentication error. Please try logging in again.
        </p>
      )}
      <Button
        data-testid="del-acc"
        disabled={!credential}
        onClick={() => handleDeleteClick()}
        variant="danger"
      >
        Delete account
      </Button>
      <Button data-testid="close-popup-oauth" onClick={onHideLocal}>
        Close
      </Button>
    </div>
  );
}
