import { useAuth } from '@/contexts/AuthContext';
import { createNotification } from '@/components/Notification/AddNotification/AddNotification';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '@/renderWrapper';
import LinkButton from '../LinkButton';
import { unlink } from 'components/Buttons/LinkButton/Unlink';

const testUserID = 'test';
const testUserID2 = 'test2';
const testNotificationID = 'testNotif';

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
      authUser: {
        uid: testUserID2,
      },
      currentUser: {
        linkedUserIds: [],
      },
    };
  });
  mockedCreateNotif.mockImplementation(() =>
    Promise.resolve({ data: testNotificationID })
  );
  const { findByTestId } = render(<LinkButton profileOwnerUID={testUserID} />);

  const button = await findByTestId('link-btn');
  fireEvent.click(button);
  await waitFor(() => expect(mockedCreateNotif).toBeCalledTimes(1));
});

it('renders unlink button correctly', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: {
        uid: testUserID2,
      },
      currentUser: {
        linkedUserIds: [testUserID],
      },
    };
  });
  mockedUnlink.mockImplementation(() => {});
  window.confirm = jest.fn(() => true); // always click 'yes'

  const { findByTestId } = render(<LinkButton profileOwnerUID={testUserID} />);

  const button = await findByTestId('link-btn');
  fireEvent.click(button);
  await waitFor(() => expect(mockedUnlink).toBeCalledTimes(1));
});
