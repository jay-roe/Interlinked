import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Register from '../page';

// mock authentication and navigation modules:

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(), // create mock function
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(), // create mock function
}));

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case
const mockedRouter = useRouter as jest.Mock<any>;

jest.spyOn(window, 'alert').mockImplementation(() => {});

// when the Register page is opened, if the user is already logged in, it redirects
it('check if user is logged in', async () => {
  // mock authUser to not be null - logged in
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: {},
    };
  });

  // we don't actually want to switch pages. Mock push function so that we can see if the page is gonna switch
  const myPush = jest.fn();
  mockedRouter.mockImplementation(() => {
    return {
      push: myPush,
    };
  });

  // render the Register page so that Register() runs
  render(<Register />);

  expect(myPush).toBeCalled; // Check if the router function was called (ie, user was redirected)
});

// when the Register page is opened, if the user is not logged in, the register form is shown
it('check if user is logged out', async () => {
  // mock authUser to be null - logged out
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: null,
    };
  });

  // render the Register page so that Register() runs
  const { findByTestId } = render(<Register />);

  // check if the message telling the user to register is on the page
  const modalTitle = await findByTestId('register-title');
  expect(modalTitle).toBeInTheDocument();
});

it('can attempt to register with matching passwords', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: null, // There is no current user
    };
  });

  const myRegister = jest.fn();
  mockedUseAuth.mockImplementation(() => {
    return {
      register: myRegister,
    };
  });

  const { findByTestId } = render(<Register />);

  const registerButton = await findByTestId('register');
  fireEvent.click(registerButton);
  await waitFor(() => expect(myRegister).toBeCalledTimes(1));
});

it("can attempt to register when passwords don't match", async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: null, // There is no current user
    };
  });

  const { findByTestId } = render(<Register />);

  const pwField = await findByTestId('pw');
  const confirmPwField = await findByTestId('confirm-pw');

  fireEvent.change(pwField, { target: { value: '123456' } });
  fireEvent.change(confirmPwField, { target: { value: '654321' } });

  const registerButton = await findByTestId('register');
  fireEvent.click(registerButton);

  expect(alert).toBeCalledWith('Passwords do not match');
});

/*
it('can attempt to register with google', async () => {
    mockedUseAuth.mockImplementation(() => {
        return { 
            authUser: null  // There is no current user
        } 
    })

    const myGoogleRegister = jest.fn(() => 0)
    mockedUseAuth.mockImplementation(() => {
        return {
            loginWithGoogle: myGoogleRegister()
        }
    })

    const { findByTestId } = render(
            <Register />
    );

    const googleRegisterButton = await findByTestId('google-register');
    fireEvent.click(googleRegisterButton);
    await waitFor(() => expect(myGoogleRegister).toBeCalled());
})
*/

it('can fill form fields', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: null, // There is no current user
    };
  });

  const { findByTestId } = render(<Register />);

  const emailField = await findByTestId('email');
  const pwField = await findByTestId('pw');
  const confirmPwField = await findByTestId('confirm-pw');

  fireEvent.change(emailField, { target: { value: 'test@test.com' } });
  fireEvent.change(pwField, { target: { value: '123456' } });
  fireEvent.change(confirmPwField, { target: { value: '123456' } });

  expect(emailField).toHaveValue('test@test.com');
  expect(pwField).toHaveValue('123456');
  expect(confirmPwField).toHaveValue('123456');
});

it('displays alert on failing to register', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: null, // There is no current user
    };
  });

  const myRegister = jest.fn().mockResolvedValue(false);
  mockedUseAuth.mockImplementation(() => {
    return {
      register: myRegister,
    };
  });

  const { findByTestId } = render(<Register />);

  const registerButton = await findByTestId('register');
  fireEvent.click(registerButton);

  expect(alert).toBeCalledWith('Passwords do not match');
});
