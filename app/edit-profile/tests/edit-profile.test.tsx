import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import EditProfile from '../page';
import { db } from '@/config/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Timestamp } from 'firebase/firestore';

jest.mock('contexts/AuthContext', () => ({ 
    useAuth: jest.fn()
}));

jest.mock('@/config/firestore', () => ({ 
    db: jest.fn()
}));

jest.mock('firebase/firestore', () => ({ 
    doc: jest.fn(),
    updateDoc: jest.fn()
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}))

jest.spyOn(window, 'alert').mockImplementation(() => {});

let stringSplitMock = {
    split: () => {
      return '';
    },
  };

  let dateMock = {
    toDate: () => {
      return new Date();
    },
  } as unknown as Timestamp;

  let splitMock = {
    split: () => {
      return '';
    },
  } as unknown as String;
  

const mockedUseAuth = useAuth as jest.Mock<any>;  // make useAuth modifiable based on the test case
const mockedRouter = useRouter as jest.Mock<any>;


// if there's no current user or the user isn't autheniticated, it says you must be logged in to edit your profile

it('check if user is logged out', async () => {

    // mockedUseAuth.mockImplementation(() => {
    //     return {
    //         authUser: null,  // There IS a current users
    //     }
    // })

    // const { findByTestId } = render(
    //     <EditProfile />
    // );

    // const loginPrompt = await findByTestId('profile-login-prompt');
    expect(loginPrompt).toBeInTheDocument();

});

it('try to update account', async () => {

    // mockedUseAuth.mockImplementation(() => {
    //     return {
    //         authUser: { },  // There IS a current users
    //         currentUser: {
    //                     profilePicture: {},
    //                     name: '',
    //                     email: {},
    //                     bio: {},
    //                     socials: {},
    //                     connections: {},
    //                     phone: {},
    //                     languages: ['lang'],
    //                     education: [{
    //                         name: '',
    //                         location: '',
    //                         startDate: '10/10/10'
    //                         }],
    //                     courses: ['title', 'number', 'descriptions'],
    //                     experience: ['title', 'employer', 'location', '09/11/2015', 'description'],
    //                     projects: [{}, 'title', 'startDate', 'description', 'repoLink', 'demoLink'],
    //                     skills: ['skill'],
    //                     awards: ['title', '09/11/2015', 'description']
    //                 }
    //     }
    // })

    // const myPush = jest.fn()
    // mockedRouter.mockImplementation((path) => {
    //     return {
    //         push: myPush
    //     }
    // })

    // const { findByTestId } = render(
    //     <EditProfile />
    // );

    // const updateAccountButton = await findByTestId('update-account-button');
    // fireEvent.click(updateAccountButton);
    // await waitFor(() => expect(myPush).toHaveBeenCalled());

});