
import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react';
import LinkButton from '../LinkButton';

it('renders edit button correctly', async () => {


    const { findByTestId } = render(
        <LinkButton currentUser={{
            awards: [],
            bio: '',
            codingLanguages: [],
            connections: [],
            courses: [],
            coverPhoto: '',
            education: [],
            email: '',
            experience: [],
            languages: [],
            name: '',
            phone: '',
            profilePicture: '',
            projects: [],
            recommendations: [],
            skills: [],
            socials: {
                github: '',
                instagram: ''
            },
            volunteering: []
        }} />
    );

    const button = await findByTestId('button');
    expect(button).toBeInTheDocument();

});