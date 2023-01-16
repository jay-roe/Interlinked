import { Button, Modal, Form } from 'react-bootstrap';
import type { DeleteAccountPopupProps } from '../../models/DeleteAccountPopup';
import { RedText } from './DeleteAccountPopup.styles';
import { useState } from 'react';
import type { MouseEvent } from 'react';

export default function DeleteAccountPopup({show, onHide, onDeleteAccount}: DeleteAccountPopupProps) {
  const [password, setPassword] = useState<string>();
  const [incorrectPassword, setIncorrectPassword] = useState<boolean>(false);

  // Clear password field before closing modal
  const onHideLocal = () => {
    setPassword('');
    setIncorrectPassword(false);
    onHide();
  }

  // Incorrect password was given if on delete returned false
  const handleDeleteClick = async (e: MouseEvent) => {
    e.preventDefault();
    
    const isCorrectPassword = await onDeleteAccount(password);
    setIncorrectPassword(!isCorrectPassword);
  }

  return (
    <Modal
      show={show}
      onHide={onHideLocal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Account
        </Modal.Title>
      </Modal.Header>
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
        <Button onClick={handleDeleteClick} variant='danger'>Delete account</Button>
        <Button onClick={onHideLocal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
