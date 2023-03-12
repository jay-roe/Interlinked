import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import ChatroomCardHeadder from '../ChatroomCardHeader';
import { testUser } from '@/types/User';
import { testChatRoom } from '@/types/Message';
import CreateChatModal from '../CreateChatModal';
import { useAuth } from '@/contexts/AuthContext';

// const promise = Promise.resolve();
// const mockSubmit = jest.fn(() => promise);

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

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
  const onSubmit = jest.fn();

  const { findByTestId } = render(<CreateChatModal userUID={'123'} />);

  const messageBox = await findByTestId('chat-modal-input');
  const button = await findByTestId('chat-modal-button');
  fireEvent.change(messageBox, { target: { value: '' } });
  // fireEvent.submit(button);
  expect(button).toBeInTheDocument();

  // const createChat= await findByTestId("chatroom-card-test-id");
  // expect(createChat).toBeInTheDocument();
});
