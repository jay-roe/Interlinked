import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import Home from '../page';

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock<any>;

it('Head without user', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: null, // There is no current user
    };
  });
  const { findByTestId } = render(<Home />);
  const base = await findByTestId('base-msg');
  expect(base).toBeInTheDocument();
});

it('Head with user', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: {}, // There IS a current user
    };
  });
  const { findByTestId } = render(<Home />);
  const welcome = await findByTestId('welcome-msg');
  expect(welcome).toBeInTheDocument();
});
