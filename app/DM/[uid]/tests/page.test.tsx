import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ChatRoom from '../page';
import { useAuth } from '@/contexts/AuthContext';

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case

mockedUseAuth.mockImplementation(() => {
  return {
    currentUser: 'SOMEThING',
    authUser: {
      uid: '666',
    },
  };
});

it('renders with user name', async () => {
  const { findByTestId } = render(<ChatRoom params={{ uid: '123' }} />);

  const chatRoom = await findByTestId('chat-room-root');
  expect(chatRoom).toBeInTheDocument();
});
