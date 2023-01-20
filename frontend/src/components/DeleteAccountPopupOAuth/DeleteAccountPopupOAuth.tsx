import { Button, Modal } from 'react-bootstrap';
import type { DeleteAccountPopupChildProps } from '../../models/DeleteAccountPopup';
import { RedText } from './DeleteAccountPopupOAuth.styles';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaGoogle } from 'react-icons/fa';
import type { UserCredential } from 'firebase/auth';

export default function DeleteAccountPopupOAuth({onHide, onDeleteAccount}: DeleteAccountPopupChildProps) {
  const [credential, setCredential] = useState<UserCredential>();
  const [isAuthError, setAuthError] = useState<boolean>(false);

  const { loginWithGoogle, reauthenticateOAuth } = useAuth();

  // Clear password field before closing modal
  const onHideLocal = () => {
    setCredential(null);
    setAuthError(false);
    onHide();
  }

  const updateCredential = async () => {
    try {
      const tempCredential = await loginWithGoogle();
      setCredential(await reauthenticateOAuth(tempCredential));
    } catch(err) {
      console.error(err);
    }
  }

  // Incorrect password was given if on delete returned false
  const handleDeleteClick = async () => {
    if (!credential) {
      await updateCredential();
    }
    
    const authError = await onDeleteAccount();
    setAuthError(!authError);
  }

  return (
    <>
      <Modal.Body>
        <h5>Please login with one of the methods below.</h5>
        <RedText>
          This action is irreversible. Your account, and all of its data, will be permanently deleted.
        </RedText>
        {/* TODO: Add logic to iterate through all providers, giving them the option to reauthenticate how they want. It is possible they have email + Google auth. */}
        <Button onClick={() => updateCredential()}><FaGoogle /> Login with Google</Button>
        {
          isAuthError && <RedText>Authentication error. Please try logging in again.</RedText>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={!credential} onClick={() => handleDeleteClick()} variant='danger'>Delete account</Button>
        <Button onClick={onHideLocal}>Close</Button>
      </Modal.Footer>
    </>
  );
}
