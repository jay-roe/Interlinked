
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../Register';
import { getAuth } from "firebase/auth";



it('check if user is registered', () => {

    const { } = render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );

    //TODO add script to register a new user

    const auth = getAuth();

    expect(auth.currentUser).toBeTruthy();

});

it('check if user is not registered', () => {

    const { } = render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );

    const auth = getAuth();

    expect(auth.currentUser).toBeNull();

});
