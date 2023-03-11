import '@testing-library/jest-dom';
import { Timestamp } from 'firebase/firestore';
import NotifBlueDot from '../NotifBlueDot';
import { render } from '@testing-library/react';
import { NotifType } from '@/types/Notification';

it('renders the blue dot', async () => {
  const { findByTestId } = render(
    <NotifBlueDot
      notification={{
        notifType: NotifType.POST,
        context: '',
        sender: '',
        notifTime: Timestamp.now(),
        read: false,
        notificationId: '',
      }}
    />
  );

  const dot = await findByTestId('blue-dot');
  expect(dot).toBeInTheDocument();
});
