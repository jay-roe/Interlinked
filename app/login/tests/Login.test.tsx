import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import Login from '../page';
import { useRouter } from 'next/navigation';

jest.spyOn(window, 'alert').mockImplementation(() => {});

jest.mock('contexts/AuthContext', () => ({ 
    useAuth: jest.fn()
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}))

const mockedUseAuth = useAuth as jest.Mock<any>;  // make useAuth modifiable based on the test case
const mockedRouter = useRouter as jest.Mock<any>;

it('check if user is logged in', async () => {
    mockedUseAuth.mockImplementation(() => {
        return {
            authUser: {}  // There IS a current users
        }
    })

    const myPush = jest.fn()
    mockedRouter.mockImplementation((path) => {
        return {
            push: myPush
        }
    })

    render(
        <Login />
    );

    expect(myPush).toBeCalled;  // Check if the router function was called (ie, user was redirected)
});

it('check if user is logged out', async () => {
    mockedUseAuth.mockImplementation(() => {
        return { 
            authUser: null  // There is no current user
        } 
    })

    const { findByTestId } = render(
            <Login />
    );


    const modalTitle = await findByTestId("login-title");
    expect(modalTitle).toBeInTheDocument();
});

it('can attempt to log in', async () => {
    mockedUseAuth.mockImplementation(() => {
        return { 
            authUser: null  // There is no current user
        } 
    })

    const myLogin = jest.fn()
    mockedUseAuth.mockImplementation(() => {
        return {
            login: myLogin()
        }
    })

    const { findByTestId } = render(
            <Login />
    );

    const loginButton = await findByTestId("login");
    fireEvent.click(loginButton);
    await waitFor(() => expect(myLogin).toBeCalledTimes(2));
})

it('can enter email and pw', async () => {
    mockedUseAuth.mockImplementation(() => {
        return { 
            authUser: null  // There is no current user
        } 
    })

    const { findByTestId } = render(
            <Login />
    );

    const emailField = await findByTestId("email");
    const pwField = await findByTestId("pw");

    fireEvent.change(emailField, { target: {value: 'test@test.com'}});
    fireEvent.change(pwField, { target: {value: '123456'}});


    expect(emailField).toHaveValue('test@test.com');
    expect(pwField).toHaveValue('123456');
})