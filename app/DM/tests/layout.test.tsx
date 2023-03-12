import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import DMLayout from '../layout';

jest.mock('contexts/AuthContext', () => ({
  AuthProvider: ({ children }) => '<div>{children}</div>', // create mock function
}));

it('renders the root', async () => {
  const { findByTestId } = render(
    <DMLayout>
      <></>
    </DMLayout>
  );

  const root = await findByTestId('dm-layout');
  expect(root).toBeInTheDocument();
});
