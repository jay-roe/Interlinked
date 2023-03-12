import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { testUser } from '@/types/User';
import DMs from '../page';
import { useAuth } from '@/contexts/AuthContext';

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case

mockedUseAuth.mockImplementation(() => {
  return {
    currentUser: 'SOMEThING',
    authUser: {
      uid: '666',
    },
  };
});

it('renders with user name', async () => {
  const { findByTestId } = render(<DMs />);

  const dmPage = await findByTestId('dms-page');
  expect(dmPage).toBeInTheDocument();
});
