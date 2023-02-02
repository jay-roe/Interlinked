import type { DeleteAccountPopupProps } from "@/types/DeleteAccountPopup";
import { useAuth } from "@/contexts/AuthContext";
import DeleteAccountPopupOAuth from "../DeleteAccountPopupOAuth/DeleteAccountPopupOAuth";
import DeleteAccountPopupEmail from "../DeleteAccountPopupEmail/DeleteAccountPopupEmail";
import { Dialog } from "@headlessui/react";

export default function DeleteAccountPopup({
  show,
  onHide,
  onDeleteAccount,
}: DeleteAccountPopupProps) {
  const { authUser } = useAuth();

  return (
    <Dialog
      open={show}
      onClose={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      className='relative z-10'
    >
      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center'>
          <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
            <Dialog.Title className='text-xl font-extrabold'>Delete Account</Dialog.Title>
            {
              // Account has OAuth provider. Make them confirm email associated to account.
              authUser.providerData[0].providerId == "google.com" ? (
                <DeleteAccountPopupOAuth
                  onHide={onHide}
                  onDeleteAccount={onDeleteAccount}
                />
              ) : (
                // Account is email/password. Make them confirm password.
                <DeleteAccountPopupEmail
                  onHide={onHide}
                  onDeleteAccount={onDeleteAccount}
                />
              )
            }
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
