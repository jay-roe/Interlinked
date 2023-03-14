import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ChatroomCardHeadder from '../ChatroomCardHeader';
import { testUser } from '@/types/User';
import { testChatRoom } from '@/types/Message';

it('renders with user name', async () => {
  const { findByTestId } = render(
    <ChatroomCardHeadder user={testUser} room={testChatRoom} />
  );

  const headerName = await findByTestId('chat-room-header');
  expect(headerName).toBeInTheDocument();
});
