export {}
/*
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../page';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../../contexts/AuthContext";


//calls login
it('check if user is logged in', async () => {

    const { } = render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
    //TODO add script to log in a test user
    // const { currentUSer, login } = useAuth();
    // await login('login@test.ca', 'logintest');

    const auth = getAuth();
    await signInWithEmailAndPassword(auth, 'login@test.ca', 'logintest');



    expect(auth.currentUser).toBeTruthy();

});

//calls logout
it('check if user is logged out', async () => {

    const { } = render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );

        const auth = getAuth();
        await auth.signOut();

    expect(auth.currentUser).toBeNull();

});
*/