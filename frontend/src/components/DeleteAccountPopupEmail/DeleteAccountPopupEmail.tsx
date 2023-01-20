import { Button, Modal, Form } from 'react-bootstrap';
import type { DeleteAccountPopupChildProps } from '../../models/DeleteAccountPopup';
import { RedText } from './DeleteAccountPopupEmail.styles';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

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
    await reauthenticateEmail(currentUser.email, password);
    
    const isCorrectPassword = await onDeleteAccount();
    setIncorrectPassword(!isCorrectPassword);
  }
    
  return (
    <>
      <Modal.Body>
        <h5>Please enter your password.</h5>
        <RedText>
          This action is irreversible. Your account, and all of its data, will be permanently deleted.
        </RedText>
        <Form.Control className='mb-3' type="password" placeholder="Password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} />
        {
          incorrectPassword && <RedText>Incorrect password.</RedText>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleDeleteClick()} variant='danger'>Delete account</Button>
        <Button onClick={onHideLocal}>Close</Button>
      </Modal.Footer>
    </>
  );
}
