// the protected route script is used for pages that are only accessible to authenticated users
// it checks if the user is logged in and rediects them to the Login page if they aren't

import { useAuth } from '@/contexts/AuthContext';
import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';

import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../ProtectedRoute';

// mock authentication and navigation modules:

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(), // create mock function
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(), // create mock function
}));

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case (I wanna mock a logged in and logged out user)
const mockedRouter = useRouter as jest.Mock<any>;

// mock alert function
jest.spyOn(window, 'alert').mockImplementation(() => {});

it('page is redirected to login when user is not authenticated', async () => {
  // user is logged out
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: null,
    };
  });

  // we don't actually want to switch pages. Mock push function so that we can see if the page switched
  const myPush = jest.fn();
  mockedRouter.mockImplementation(() => {
    return {
      push: myPush,
    };
  });

  // render the protected file
  render(
    <ProtectedRoute>
      <></>
    </ProtectedRoute>
  );

  // Check if the router function was called (ie, user was redirected)
  expect(myPush).toHaveBeenCalledWith('/en/login');
});

// check if the user is authenticated. If they are, there should be no redirect called
it('page is not redirected to when user is authenticated', async () => {
  // user is logged in
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: {},
    };
  });

  // Mock push function so that we can see if the page switched
  const myPush = jest.fn();
  mockedRouter.mockImplementation(() => {
    return {
      push: myPush(),
    };
  });

  render(
    <ProtectedRoute>
      <></>
    </ProtectedRoute>
  );

  // Check if the router function was not called (ie, user was redirected)
  expect(myPush).not.toHaveBeenCalledWith('/en/login');
});
