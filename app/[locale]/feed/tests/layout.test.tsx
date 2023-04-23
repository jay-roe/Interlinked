import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';

import RootLayout from '../layout';

const children = <div>test</div>;

it('renders the root', async () => {
  const { findByTestId } = render(<RootLayout>{children}</RootLayout>);
  const root = await findByTestId('feed-layout');
  expect(root).toBeInTheDocument();
});
