import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';

import RootLayout from '../layout';

jest.mock('contexts/AuthContext', () => ({
  AuthProvider: ({ children }) => '<div>{children}</div>', // create mock function
}));

it('renders the root', async () => {
  const { findByTestId } = render(
    <RootLayout>
      <></>
    </RootLayout>
  );

  const layoutDiv = await findByTestId('layout-div');
  expect(layoutDiv).toBeInTheDocument();
});
