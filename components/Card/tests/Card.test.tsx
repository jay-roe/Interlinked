import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Card from '../Card';

it('renders Card', async () => {
  const { findByTestId } = render(<Card />);

  const cardClass1 = await findByTestId('card', { exact: false });
  expect(cardClass1).toBeInTheDocument();
});
