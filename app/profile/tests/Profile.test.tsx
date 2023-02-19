import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import Profile from '../page';
import { useRouter } from 'next/navigation';

// on the profile page, if you're logged in, it will show your profile and a delete account option
// if you're not logged in, give the option to login instead

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case
const mockedRouter = useRouter as jest.Mock<any>;

it('check if user is logged out', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: null, // There IS a current users
    };
  });

  const { findByTestId } = render(<Profile />);

  const profileInfo = await findByTestId('profile-login-prompt');
  expect(profileInfo).toBeInTheDocument();
});
