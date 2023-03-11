import '@testing-library/jest-dom';
import { Timestamp } from 'firebase/firestore';
import NotifBlueDot from '../NotifBlueDot';
import { render } from '@testing-library/react';

it('renders the blue dot', async () => {
  const { findByTestId } = render(
    <NotifBlueDot
      notification={{
        notifType:
          'c:/Users/melis/OneDrive/Documents/GitHub/Interlinked_SOEN390_Team11/types/Notification'
            .POST,
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
