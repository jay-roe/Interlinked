
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Login';
import { getAuth } from "firebase/auth";



it('check if user is logged in', () => {

    const { } = render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );

    //TODO add script to log in a test user

    const auth = getAuth();

    expect(auth.currentUser).toBeTruthy();

});

it('check if user is logged out', () => {

    const { } = render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );

    const auth = getAuth();

    expect(auth.currentUser).toBeNull();

});
