import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
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

  const root = await findByTestId('root-container');
  expect(root).toBeInTheDocument();
});
