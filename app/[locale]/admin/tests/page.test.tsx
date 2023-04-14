import '@testing-library/jest-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { waitFor } from '@testing-library/react';
import { render } from '@/renderWrapper';

import Admin from '../page';

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  push: jest.fn(),
}));

// jest.mock('next/router', () => ({
//     push: mockNav,
// }))

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case
const mockedRouter = useRouter as jest.Mock<any>;

it('admin logged in', async () => {
  const mockNav = jest.fn();
  mockedUseAuth.mockImplementation(() => {
    return {
      currentAdmin: null, // There is no current user
    };
  });
  mockedRouter.mockImplementation(() => ({
    push: mockNav,
  }));

  const {} = render(<Admin />);
  await waitFor(() => expect(mockNav).toBeCalledTimes(1));
});
