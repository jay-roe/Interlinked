export {}
/*
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../page';
import { getAuth , createUserWithEmailAndPassword } from "firebase/auth";


//tests are dependent on the 'delete account' tests passing
it('check if user is registered', async () => {

    const { } = render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );
    
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, 'register@test.ca', 'registertest');


    expect(auth.currentUser).toBeTruthy();

});
it('check if user is not registered', () => {


    const { } = render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );

    //TODO: waiting on delete account implementation
    const auth = getAuth();

    expect(auth.currentUser).toBeNull();

});*/
