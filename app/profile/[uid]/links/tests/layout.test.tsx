import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import RootLayout from '../layout';

const children = <div>test</div>;

it('renders the root', async () => {
  const { findByTestId } = render(<RootLayout>{children}</RootLayout>);
  const root = await findByTestId('title');
  expect(root).toBeInTheDocument();
});
