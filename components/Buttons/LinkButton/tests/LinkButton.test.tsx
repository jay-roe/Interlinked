import { useAuth } from '@/contexts/AuthContext';
import { createNotification } from '@/components/Notification/AddNotification/AddNotification';
import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import LinkButton from '../LinkButton';
import { unlink } from 'components/Buttons/LinkButton/Unlink';

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('components/Notification/AddNotification/AddNotification', () => ({
  createNotification: jest.fn(),
}));

jest.mock('components/Buttons/LinkButton/Unlink', () => ({
  unlink: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case
const mockedCreateNotif = createNotification as jest.Mock<any>;
const mockedUnlink = unlink as jest.Mock<any>;

it('renders link button correctly', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: {},
      currentUser: {
        linkedUserIds: [],
      },
    };
  });
  mockedCreateNotif.mockImplementation(() => {});
  const { findByTestId } = render(<LinkButton profileOwnerUID="someUserID" />);

  const button = await findByTestId('link-btn');
  fireEvent.click(button);
  await waitFor(() => expect(mockedCreateNotif).toBeCalledTimes(1));
});

it('renders unlink button correctly', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: {},
      currentUser: {
        linkedUserIds: ['someUserID'],
      },
    };
  });
  mockedUnlink.mockImplementation(() => {});
  const { findByTestId } = render(<LinkButton profileOwnerUID="someUserID" />);

  const button = await findByTestId('link-btn');
  fireEvent.click(button);
  await waitFor(() => expect(mockedUnlink).toBeCalledTimes(1));
});
