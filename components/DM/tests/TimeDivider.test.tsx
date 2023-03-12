import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import TimeDivider from '../TimeDivider';
import { Timestamp } from 'firebase/firestore';

it('renders with timestamp', async () => {
  const date = Timestamp.now();
  const { findByText } = render(<TimeDivider time={date} />);

  const timeDivider = await findByText(
    date.toDate().toLocaleString('en-US', {
      month: 'long',
      year: 'numeric',
      day: '2-digit',
    })
  );
  expect(timeDivider).toBeInTheDocument();
});
