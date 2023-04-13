import '@testing-library/jest-dom';
import { createEvent, fireEvent, waitFor } from '@testing-library/react';
import { render } from '@/renderWrapper';
import ChatRoom from '../page';
import { useAuth } from '@/contexts/AuthContext';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const img = 'gs://interlinked-420e3.appspot.com/`image/1637773583.png`';

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

it('previews image', async () => {
  const { findByTestId } = render(<ChatRoom params={{ uid: '123' }} />);

  const blob = new Blob([img]);
  const file = new File([blob], 'test_image', {
    type: 'image/png',
  });

  File.prototype.text = jest.fn().mockResolvedValueOnce(img);
  const input = await findByTestId('dm-image-upload');
  const inputButton = await findByTestId('dm-button-file-upload');
  fireEvent.click(inputButton);

  await waitFor(() =>
    fireEvent(
      input,
      createEvent('input', input, {
        target: { files: file },
      })
    )
  );
  const chatRoom = await findByTestId('chat-room-root');
  expect(chatRoom).toBeInTheDocument();
});
