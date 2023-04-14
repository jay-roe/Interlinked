import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';

import Card from '../Card';

it('renders Card', async () => {
  const { findByTestId } = render(<Card data-testid="card" />);

  const cardClass1 = await findByTestId('card', { exact: false });
  expect(cardClass1).toBeInTheDocument();
});
