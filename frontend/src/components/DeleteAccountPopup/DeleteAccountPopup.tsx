import { Modal } from 'react-bootstrap';
import type { DeleteAccountPopupProps } from '../../models/DeleteAccountPopup';
import { useAuth } from '../../contexts/AuthContext';
import DeleteAccountPopupOAuth from '../DeleteAccountPopupOAuth/DeleteAccountPopupOAuth';
import DeleteAccountPopupEmail from '../DeleteAccountPopupEmail/DeleteAccountPopupEmail';

export default function DeleteAccountPopup({show, onHide, onDeleteAccount}: DeleteAccountPopupProps) {
  const { authUser } = useAuth();

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Account
        </Modal.Title>
      </Modal.Header>
      {
        // Account has OAuth provider. Make them confirm email associated to account.
        authUser.providerData.length > 0 ?
        <DeleteAccountPopupOAuth onHide={onHide} onDeleteAccount={onDeleteAccount} />
        :
        // Account is email/password. Make them confirm password.
        <DeleteAccountPopupEmail onHide={onHide} onDeleteAccount={onDeleteAccount} />
      }
    </Modal>
  );
}
