import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import Login from '../page';
import { useRouter } from 'next/navigation';

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
            currentUser: {}  // There IS a current user
        }
    })

    const myPush = jest.fn()
    mockedRouter.mockImplementation(() => {
        return {
            push: myPush()
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
            currentUser: null  // There IS a current user
        } 
    })

    const { findByTestId } = render(
            <Login />
    );


    const modalTitle = await findByTestId("login-title");
    expect(modalTitle).toBeInTheDocument();
});
