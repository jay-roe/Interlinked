import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '@/renderWrapper';
import DeleteAccountPopup from '../../DeleteAccountPopup/DeleteAccountPopup';

jest.mock('contexts/AuthContext', () => ({
  useAuth() {
    return {
      currentUser: {},
      authUser: {
        providerData: [{ providerId: 'password' }], // account is email/password
      },
      reauthenticateEmail: jest.fn(), //(email:"test@test.com", password:"testpw") => {return true}
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

it('deletes account given correct password', async () => {
  const onDel = jest.fn().mockResolvedValue(true);
  const { findByTestId } = render(
    <DeleteAccountPopup
      show={true}
      onHide={jest.fn()}
      onDeleteAccount={onDel}
    />
  );
  const deleteButton = await findByTestId('del-acc');
  fireEvent.click(deleteButton);
  await waitFor(() => expect(onDel).toBeCalledTimes(1));
});

it('renders warning message given incorrect password', async () => {
  const onDel = () => {
    throw new Error();
  };
  const { findByTestId } = render(
    <DeleteAccountPopup
      show={true}
      onHide={jest.fn()}
      onDeleteAccount={onDel}
    />
  );
  const deleteButton = await findByTestId('del-acc');
  fireEvent.click(deleteButton);

  const incorrectMsg = await findByTestId('incorrect-pw');
  await waitFor(() => expect(incorrectMsg).toBeInTheDocument());
});

it('saves password on change', async () => {
  const onDel = jest.fn().mockResolvedValue(true);
  const { findByTestId } = render(
    <DeleteAccountPopup
      show={true}
      onHide={jest.fn()}
      onDeleteAccount={onDel}
    />
  );
  const pwField = await findByTestId('pw-field');
  fireEvent.change(pwField, { target: { value: 'PW' } });
  await waitFor(() => expect(pwField).toHaveValue('PW'));
});

it('closes the modal on close', async () => {
  const onHide = jest.fn();

  const { findByTestId } = render(
    <DeleteAccountPopup
      show={true}
      onHide={onHide}
      onDeleteAccount={jest.fn()}
    />
  );

  const closeButton = await findByTestId('close-popup');
  fireEvent.click(closeButton);
  await waitFor(() => expect(onHide).toBeCalledTimes(1));
});
