import '@testing-library/jest-dom'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { render } from '@testing-library/react';
import Register from '../page';



// note: all the onclick and onchanges in Register and Login are preventing code coverage
// why??? Find out soon..:P



// mock authentication and navigation modules:

jest.mock('contexts/AuthContext', () => ({ 
    useAuth: jest.fn()  // create mock function
})); 

jest.mock('next/navigation', () => ({
    useRouter: jest.fn()    // create mock function
}))

const mockedUseAuth = useAuth as jest.Mock<any>;  // make useAuth modifiable based on the test case
const mockedRouter = useRouter as jest.Mock<any>;


// when the Register page is opened, if the user is already logged in, it redirects
it('check if user is logged in', async () => {

    // mock authUser to not be null - logged in
    mockedUseAuth.mockImplementation(() => {
        return {
            currentUser: {}
        }
    })

    // we don't actually want to switch pages. Mock push function so that we can see if the page is gonna switch
    const myPush = jest.fn()
    mockedRouter.mockImplementation(() => {
        return {
            push: myPush()
        }
    })

    // render the Register page so that Register() runs
    render(
        <Register />
    );

    expect(myPush).toBeCalled;  // Check if the router function was called (ie, user was redirected)
});

// when the Register page is opened, if the user is not logged in, the register form is shown
it('check if user is logged out', async () => {

    // mock authUser to be null - logged out
    mockedUseAuth.mockImplementation(() => {
        return { 
            currentUser: null
        } 
    })

    // render the Register page so that Register() runs
    const { findByTestId } = render(
            <Register />
    );

    // check if the message telling the user to register is on the page
    const modalTitle = await findByTestId("register-title");
    expect(modalTitle).toBeInTheDocument();
});