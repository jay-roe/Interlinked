
import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import Profile from '../page';
import { useRouter } from 'next/navigation';


// on the profile page, if you're logged in, it will show your profile and a delete account option
// if you're not logged in, give the option to login instead


jest.mock('contexts/AuthContext', () => ({ 
    useAuth: jest.fn()
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}))

const mockedUseAuth = useAuth as jest.Mock<any>;  // make useAuth modifiable based on the test case
const mockedRouter = useRouter as jest.Mock<any>;

// I have to figure out how to either pass the object in properly so the toDate() function can be called on dates
// or I need to mock toDate() (TimeStamp.toDate())

// it('check if user is logged in', async () => {

//     mockedUseAuth.mockImplementation(() => {
//         return {
//             authUser: {},  // There IS a current users
//             currentUser: {
//                 profilePicture: {},
//                 name: {},
//                 email: {},
//                 bio: {},
//                 socials: {},
//                 connections: {},
//                 phone: {},
//                 languages: ['lang'],
//                 education: [{
//                     name: '',
//                     location: '',
//                     startDate: '10/10/10'
//                   }],
//                 courses: ['title', 'number', 'descriptions'],
//                 experience: ['title', 'employer', 'location', '09/11/2015', 'description'],
//                 projects: [{}, 'title', 'startDate', 'description', 'repoLink', 'demoLink'],
//                 skills: ['skill'],
//                 awards: ['title', '09/11/2015', 'description']
//             }
//         }
//     })

//     const { findByTestId } = render(
//         <Profile />
//     );

//     const profileInfo = await findByTestId('profile-info');
//     expect(profileInfo).toBeInTheDocument();

// });


it('check if user is logged out', async () => {

    mockedUseAuth.mockImplementation(() => {
        return {
            authUser: null,  // There IS a current users
        }
    })

    const { findByTestId } = render(
        <Profile />
    );

    const profileInfo = await findByTestId('profile-login-prompt');
    expect(profileInfo).toBeInTheDocument();

});