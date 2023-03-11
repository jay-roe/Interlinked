import '@testing-library/jest-dom';
import { useAuth } from '@/contexts/AuthContext';
import { render } from '@testing-library/react';
import NavBar from '../NavBar';

jest.mock('contexts/AuthContext', () => ({
  // override the real useAuth, which would require firebase connection
  useAuth: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case

it('render nav bar component without a user', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: null,
    };
  });

  const { findByText } = render(<NavBar />);
  const navbarElement = await findByText('Register', { exact: false });
  expect(navbarElement).toBeInTheDocument();
});

it('render nav bar component without a user', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: null,
    };
  });

  const { findByText } = render(<NavBar />);
  const navbarElement = await findByText('Register', { exact: false });
  expect(navbarElement).toBeInTheDocument();
});
