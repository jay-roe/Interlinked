import '@testing-library/jest-dom';
import { findByTestId, render } from '@testing-library/react';
import TimeDivider from '../TimeDivider';
import { Timestamp } from 'firebase/firestore';

Date.now = jest.fn(() => new Date(Date.UTC(2017, 1, 14)).valueOf());

it('renders with time less than 1 day', async () => {
  const date = Timestamp.now();
  Date.now = jest.fn(() => date.toMillis() + 100);

  const { findByTestId } = render(<TimeDivider time={date} />);

  const timeDivider = await findByTestId('time-divider-date');
  expect(timeDivider).toBeInTheDocument();
});

it('renders with time more than 1 day and more than 2 days ', async () => {
  const date = Timestamp.now();
  Date.now = jest.fn(() => date.toMillis() + 86500 * 1000);

  const { findByTestId } = render(<TimeDivider time={date} />);

  const timeDivider = await findByTestId('time-divider-date');
  expect(timeDivider).toBeInTheDocument();
});

it('renders with time less than 3 days', async () => {
  const date = Timestamp.now();
  Date.now = jest.fn(() => date.toMillis() + 172900 * 1000);
  const { findByTestId } = render(<TimeDivider time={date} />);

  const timeDivider = await findByTestId('time-divider-date');
  expect(timeDivider).toBeInTheDocument();
});

it('renders with time more than 3 days', async () => {
  const date = Timestamp.now();
  Date.now = jest.fn(() => date.toMillis() + 259300 * 1000);
  const { findByTestId } = render(<TimeDivider time={date} />);

  const timeDivider = await findByTestId('time-divider-date');
  expect(timeDivider).toBeInTheDocument();
});
