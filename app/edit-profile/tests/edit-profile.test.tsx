import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import EditProfile from '../page';

// if there's no current user or the user isn't autheniticated, it says you must be logged in to edit your profile


jest.mock('contexts/AuthContext', () => ({ 
    useAuth: jest.fn()
}));

const mockedUseAuth = useAuth as jest.Mock<any>;  // make useAuth modifiable based on the test case

it('check if user is logged out', async () => {


});