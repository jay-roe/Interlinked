import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import DeleteAccountPopup from '../../DeleteAccountPopup/DeleteAccountPopup';
import { useAuth } from '@/contexts/AuthContext';
import { act } from 'react-dom/test-utils';

const mockReauth = jest.fn();
jest.mock('contexts/AuthContext', () => ({
  useAuth() {
    return {
      loginWithGoogle: jest.fn(),
      currentUser: {},
      authUser: {
        providerData: [{ providerId: 'google.com' }], // account is email/password
      },
      reauthenticateEmail: jest.fn(), //(email:"test@test.com", password:"testpw") => {return true}
      reauthenticateOAuth: mockReauth.mockImplementation(() => {
        return 1;
      }), // used for credential update test
    };
  },
}));

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => jest.fn(),
});

window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock);

it('renders oauth delete account popup given an oauth user (oauth)', async () => {
  const { findByTestId } = render(
    <DeleteAccountPopup
      show={true}
      onHide={jest.fn()}
      onDeleteAccount={jest.fn().mockResolvedValue(jest.fn())}
    />
  );
  const oAuthPopup = await findByTestId('delete-acc-oauth');
  expect(oAuthPopup).toBeInTheDocument();
});

// WIP
// it("deletes account given correct password", async () => {
//     const onDel = jest.fn().mockResolvedValue(true);
//     const { findByTestId } = render(
//         <DeleteAccountPopup show={true} onHide={jest.fn()} onDeleteAccount={onDel} />
//     );
//     const deleteButton = await findByTestId("del-acc-oauth");
//     fireEvent.click(deleteButton);
//     await waitFor(() => expect(onDel).toBeCalledTimes(1));
// });

it('closes the modal on close (oauth)', async () => {
  const onHide = jest.fn();

  const { findByTestId } = render(
    <DeleteAccountPopup
      show={true}
      onHide={onHide}
      onDeleteAccount={jest.fn()}
    />
  );

  const closeButton = await findByTestId('close-popup-oauth');
  fireEvent.click(closeButton);
  await waitFor(() => expect(onHide).toBeCalledTimes(1));
});

it('updates credentials on click (oauth)', async () => {
  const onHide = jest.fn();

  const { findByTestId } = render(
    <DeleteAccountPopup
      show={true}
      onHide={onHide}
      onDeleteAccount={jest.fn()}
    />
  );

  const updateButton = await findByTestId('update-credentials-oauth');
  fireEvent.click(updateButton);
  await waitFor(() => expect(mockReauth).toBeCalledTimes(1));
});

it('DELETES', async () => {
  const onDel = jest.fn();

  const { findByTestId } = render(
    <DeleteAccountPopup
      show={true}
      onHide={jest.fn()}
      onDeleteAccount={onDel}
    />
  );

  // to update the credentials cuz otherwise the delete button is disabled
  await act(async () => {
    const updateButton = await findByTestId('update-credentials-oauth');
    fireEvent.click(updateButton);
  });

  const deleteButton = await findByTestId('del-acc');
  fireEvent.click(deleteButton);

  await waitFor(() => expect(onDel).toHaveBeenCalled());
});
