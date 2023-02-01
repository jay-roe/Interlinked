import { useAuth } from '@/contexts/AuthContext';
import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react';
import NavBar from '../NavBar';

jest.mock("contexts/AuthContext", () => ({
    useAuth: jest.fn()
}))

const mockedUseAuth = useAuth as jest.Mock<any>;

it('render nav bar component with a user', async () => {
    mockedUseAuth.mockImplementation(() => {
        return {
            currentUser: {}
        }
    })
    const { findByText } = render(
            <NavBar />
    );
    const navbarElement = await findByText("Logout", { exact: false });
    expect(navbarElement).toBeInTheDocument();
});

it('calls the logout function on button click', async () => {
    const logout = jest.fn()
    mockedUseAuth.mockImplementation(() => {
        return {
            currentUser: {},
            logout: logout
        }
    })
    const { findByText } = render(
            <NavBar />
    );
    const logoutButton = await findByText("Logout", { exact: false });

    fireEvent.click(logoutButton)
    await waitFor(() => {expect(logout).toBeCalled()})
});

it('render nav bar component without a user', async () => {
    mockedUseAuth.mockImplementation(() => {
        return {
            currentUser: null
        }
    })

    const { findByText } = render(
            <NavBar />
    );
    const navbarElement = await findByText("Register", { exact: false });
    expect(navbarElement).toBeInTheDocument();
});