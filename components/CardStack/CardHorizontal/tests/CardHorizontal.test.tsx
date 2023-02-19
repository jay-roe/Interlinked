import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import CardHorizontal from '../CardHorizontal';

it('render cardHorizontal', async () => {
  const { findByTestId } = render(<CardHorizontal />);
  const cardHorizontal = await findByTestId('card-horizontal');
  expect(cardHorizontal).toBeInTheDocument();
});
