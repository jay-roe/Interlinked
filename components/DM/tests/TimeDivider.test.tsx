import '@testing-library/jest-dom';
import { findByTestId, render } from '@testing-library/react';
import TimeDivider from '../TimeDivider';
import { Timestamp } from 'firebase/firestore';

it('renders with timestamp', async () => {
  const date = Timestamp.now();
  const { findByTestId } = render(<TimeDivider time={date} />);

  const timeDivider = await findByTestId('time-divider-date');
  expect(timeDivider).toBeInTheDocument();
});
