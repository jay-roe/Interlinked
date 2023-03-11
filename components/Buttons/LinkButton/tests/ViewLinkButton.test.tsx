import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ViewLinkButton from '../ViewLinkButton';

it('renders edit button correctly', async () => {
  const { findByTestId } = render(
    <ViewLinkButton
      currentUser={{
        awards: [],
        bio: '',
        codingLanguages: [],
        linkedUserIds: [],
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
          instagram: '',
        },
        volunteering: [],
      }}
    />
  );

  const button = await findByTestId('button');
  expect(button).toBeInTheDocument();
});
