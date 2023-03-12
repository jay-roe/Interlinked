import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ChatroomCardHeadder from '../ChatroomCardHeader';
import { testUser } from '@/types/User';
import { testChatRoom } from '@/types/Message';
import ChatroomCard from '../ChatroomCard';
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
  const { findByTestId } = render(<ChatroomCard room={testChatRoom} />);

  const roomCard = await findByTestId('chatroom-card-test-id');
  expect(roomCard).toBeInTheDocument();
});
