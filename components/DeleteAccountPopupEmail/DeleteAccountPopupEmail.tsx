import type { DeleteAccountPopupChildProps } from "@/types/DeleteAccountPopup";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "../Button/Button";
import { Dialog } from "@headlessui/react";

export default function DeleteAccountPopupEmail({
  onHide,
  onDeleteAccount,
}: DeleteAccountPopupChildProps) {
  const [password, setPassword] = useState<string>("");
  const [incorrectPassword, setIncorrectPassword] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(true);

  const { currentUser, reauthenticateEmail } = useAuth();

  // Clear password field before closing modal
  const onHideLocal = () => {
    setOpen(false);
    setPassword("");
    setIncorrectPassword(false);
    onHide();
  };

  // Incorrect password was given if on delete returned false
  const handleDeleteClick = async () => {
    try {
      await reauthenticateEmail(currentUser.email, password);
      await onDeleteAccount();
    } catch (err) {
      setIncorrectPassword(true);
    }
  };

  return (
    <div data-testid="delete-acc-email">
      {/* <Dialog open={open} onClose={onHideLocal}> */}
        <p className="text-red-500">
          This action is irreversible. Your account, and all of its data, will
          be permanently deleted.
        </p>
        <h5 className="mb-1">Please enter your password.</h5>
        <input
          data-testid="pw-field"
          className="mb-3 block w-full appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {incorrectPassword ? (
          <p className="text-red-500" data-testid="incorrect-pw">
            Incorrect password.
          </p>
        ) : null}
        <Button
          data-testid="del-acc"
          onClick={() => handleDeleteClick()}
          className='bg-red-500'
        >
          Delete account
        </Button>
        <Button data-testid="close-popup" onClick={onHideLocal}>
          Close
        </Button>
      {/* </Dialog> */}
    </div>
  );
}
