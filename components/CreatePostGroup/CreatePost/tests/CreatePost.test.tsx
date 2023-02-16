import { useAuth } from '@/contexts/AuthContext';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import CreatePost from '../CreatePost';

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case

it('displays profile pic if user has one', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: {
        coverPhoto: 'yes',
      },
    };
  });

  const { findByTestId } = render(<CreatePost />);
  const profilePic = await findByTestId('profile-pic');

  expect(profilePic).toHaveTextContent('yes');
});

it('displays placeholder if user has no profile pic', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: {},
    };
  });

  const { findByTestId } = render(<CreatePost />);
  const placeholderPic = await findByTestId('placeholder-pic');

  expect(placeholderPic).toBeInTheDocument();
});

it('renders', async () => {
  const { findByText } = render(<CreatePost />);

  const createPostPrompt = await findByText('Create a Post', { exact: false });
  expect(createPostPrompt).toBeInTheDocument; // Check if the router function was called (ie, user was redirected)
});

it('saves users input', async () => {
  const { findByTestId } = render(<CreatePost />);

  const postContent = await findByTestId('post-content');

  fireEvent.change(postContent, {
    target: { value: 'Test post content babyyyyyyy' },
  });

  expect(postContent).toHaveValue('Test post content babyyyyyyy');
});

it('calls prop function on submit', async () => {
  const myPropFunc = jest.fn();
  const { findByTestId } = render(<CreatePost getText={() => myPropFunc()} />);

  const postButton = await findByTestId('post-button');
  fireEvent.click(postButton);

  expect(myPropFunc).toBeCalledTimes(1); // Check if the router function was called (ie, user was redirected)
});
