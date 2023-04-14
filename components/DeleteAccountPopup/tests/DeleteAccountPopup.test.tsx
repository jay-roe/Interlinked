import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';
import DeleteAccountPopup from '../DeleteAccountPopup';

jest.mock('contexts/AuthContext', () => ({
  // file-wide mock
  useAuth() {
    return {
      authUser: {
        providerData: [{ providerId: 'google.com' }], // account has OAuth provider
      },
    };
  },
}));

it('renders delete modal', async () => {
  const { findByText } = render(
    <DeleteAccountPopup
      show={true}
      onHide={jest.fn()}
      onDeleteAccount={jest.fn().mockResolvedValue(jest.fn())}
    />
  );
  const modalTitle = await findByText('Delete Account');
  expect(modalTitle).toBeInTheDocument();
});
