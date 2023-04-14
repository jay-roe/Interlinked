import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Home from '../page';

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock<any>;
const mockedUseRouter = useRouter as jest.Mock<any>;

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

it('redirects to locked page when account is locked', () => {
  mockedUseAuth.mockReturnValue({
    currentUser: { accountLocked: true },
  });
  mockedUseRouter.mockReturnValue({
    push: jest.fn(),
  });

  render(<Home />);
  expect(mockedUseRouter().push).toHaveBeenCalledWith('/en/locked');
});

it('redirects to locked page when account is timed out', () => {
  mockedUseAuth.mockReturnValue({
    currentUser: { accountTimeout: true },
  });
  mockedUseRouter.mockReturnValue({
    push: jest.fn(),
  });

  render(<Home />);
  expect(mockedUseRouter().push).toHaveBeenCalledWith('/en/locked');
});

it('does not redirect when account is not locked or timed out', () => {
  mockedUseAuth.mockReturnValue({
    currentUser: {},
  });
  mockedUseRouter.mockReturnValue({
    push: jest.fn(),
  });

  render(<Home />);
  expect(mockedUseRouter().push).not.toHaveBeenCalled();
});
