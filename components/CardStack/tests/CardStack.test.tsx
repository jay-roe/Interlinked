import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import CardStack from '../CardStack';

const children = [
  <div key="1">1</div>,
  <div key="2">2</div>,
  <div key="3">3</div>,
];

it('renders button for card reset', async () => {
  const { findByTestId } = render(<CardStack children={children} />);

  const resetButton = await findByTestId('reset-button');

  fireEvent.click(resetButton);
  expect(resetButton).toBeInTheDocument();
});

it('renders next button', async () => {
  const { findByTestId } = render(<CardStack children={children} />);

  const nextButton = await findByTestId('next-button');
  fireEvent.click(nextButton);
  expect(nextButton).toBeInTheDocument();
});
