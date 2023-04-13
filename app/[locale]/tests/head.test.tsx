import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';

import Head from '../head';

it('renders the head', async () => {
  const { findByTestId } = render(<Head />);

  const head = await findByTestId('head-title');
  expect(head).toBeInTheDocument();
});
