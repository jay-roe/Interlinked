import type { DeleteAccountPopupChildProps } from '@/types/DeleteAccountPopup';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import type { UserCredential } from 'firebase/auth';

import Button from '../Buttons/Button';
import GoogleButton from '../Buttons/GoogleButton/GoogleButton';
import { useTranslations } from 'next-intl';

export default function DeleteAccountPopupOAuth({
  onHide,
  onDeleteAccount,
}: DeleteAccountPopupChildProps) {
  const t = useTranslations('DeleteAccountOAuth');
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
      {/* TODO: Add logic to iterate through all providers, giving them the option to reauthenticate how they want. It is possible they have email + Google auth. */}
      {!credential ? (
        <div>
          <h5 className="mb-2">{t('login-prompt')}</h5>
          <GoogleButton
            data-testid="update-credentials-oauth"
            onClick={() => updateCredential()}
          >
            {t('login-goog')}
          </GoogleButton>
          {isAuthError && (
            <p data-testid="auth-error" className="text-red-500">
              {t('auth-err')}
            </p>
          )}
        </div>
      ) : (
        <div>
          <p className="mb-2 text-sm text-red-500">{t('delete-warning')}</p>
          <Button
            data-testid="del-acc"
            variant="danger"
            className="mb-2"
            disabled={!credential}
            onClick={() => handleDeleteClick()}
          >
            {t('delete')}
          </Button>
        </div>
      )}
      <Button data-testid="close-popup-oauth" onClick={onHideLocal}>
        {t('close')}
      </Button>
    </div>
  );
}
