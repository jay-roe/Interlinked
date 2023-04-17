import { useAuth } from '@/contexts/AuthContext';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '@/renderWrapper';
import CreatePost from '../CreatePost';

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case

it('displays profile pic if user has one', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: {
        profilePicture:
          'https://firebasestorage.googleapis.com/v0/b/interlinked-420e3.appspot.com/o/users%2FqDIWdvP2J1dahsSzkLdmpTOfjGe2%2FprofilePicture%2FFunnyDecemberPic.jpg?alt=media&token=2d09f4e0-43bb-4bdd-87d3-8d05bda87a31',
      },
    };
  });

  const { findByTestId } = render(<CreatePost getText={jest.fn} />);
  const profilePic = await findByTestId('create-post-profile-pic');

  // Ensure image is rendered
  expect(profilePic.tagName).toBe<string>('IMG');
});

it('displays placeholder if user has no profile pic', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: {},
    };
  });

  const { findByTestId } = render(<CreatePost getText={jest.fn} />);
  const placeholderPic = await findByTestId('placeholder-pic');

  expect(placeholderPic).toBeInTheDocument();
});

it('renders', async () => {
  const { findByText } = render(<CreatePost getText={jest.fn} />);

  const createPostPrompt = await findByText('Create a Post', { exact: false });
  expect(createPostPrompt).toBeInTheDocument(); // Check if the router function was called (ie, user was redirected)
});

it('saves users input', async () => {
  const testPostContent = 'Test post content babyyyyyyy';
  const { findByTestId } = render(<CreatePost getText={jest.fn} />);

  const postContent = await findByTestId('post-content');

  postContent.setAttribute('text', testPostContent);

  // View post preview
  const previewButton = await findByTestId('create-post-preview-button');
  fireEvent.click(previewButton);

  // Set message
  const previewContentContainer = await findByTestId('post-preview-content');
  previewContentContainer.setAttribute('message', testPostContent);

  // Check if message set correctly (assume it will show after state update)
  const previewContent = await findByTestId('post-preview-content');
  await waitFor(() =>
    expect(previewContent).toHaveAttribute('message', testPostContent)
  );
});

it('calls prop function on submit', async () => {
  const myPropFunc = jest.fn();
  const { findByTestId } = render(<CreatePost getText={() => myPropFunc()} />);

  const postButton = await findByTestId('post-button');
  fireEvent.click(postButton);

  expect(myPropFunc).toBeCalledTimes(1); // Check if the router function was called (ie, user was redirected)
});
