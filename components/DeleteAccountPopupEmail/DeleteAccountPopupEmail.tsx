import { Button, Modal, Form } from 'react-bootstrap';
import type { DeleteAccountPopupChildProps } from '@/types/DeleteAccountPopup';
import { RedText } from './DeleteAccountPopupEmail.styles';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function DeleteAccountPopupEmail({onHide, onDeleteAccount}: DeleteAccountPopupChildProps) {
  const [password, setPassword] = useState<string>();
  const [incorrectPassword, setIncorrectPassword] = useState<boolean>(false);

  const { currentUser, reauthenticateEmail } = useAuth();

  // Clear password field before closing modal
  const onHideLocal = () => {
    setPassword('');
    setIncorrectPassword(false);
    onHide();
  }
  
  // Incorrect password was given if on delete returned false
  const handleDeleteClick = async () => {
    try {
      await reauthenticateEmail(currentUser.email, password);
      await onDeleteAccount();
    } catch (err) {
      setIncorrectPassword(true);
    }
  }
    
  return (
    <div data-testid="delete-acc-email">
      <Modal.Body>
        <h5>Please enter your password.</h5>
        <RedText>
          This action is irreversible. Your account, and all of its data, will be permanently deleted.
        </RedText>
        <Form.Control data-testid="pw-field" className='mb-3' type="password" placeholder="Password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} />
        {
          incorrectPassword ? <RedText data-testid="incorrect-pw">Incorrect password.</RedText> : null
        }
      </Modal.Body>
      <Modal.Footer>
        <Button data-testid="del-acc" onClick={() => handleDeleteClick()} variant='danger'>Delete account</Button>
        <Button data-testid="close-popup" onClick={onHideLocal}>Close</Button>
      </Modal.Footer>
    </div>
  );
}
