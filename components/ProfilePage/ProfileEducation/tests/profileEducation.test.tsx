import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ProfileEducation from '../ProfileEducation';

let mockedDate = {
    toDate: () => {
      return new Date();
    }
  };

const currentUser = {
    awards: [],
        bio: '',
        codingLanguages: [],
        connections: [],
        courses: [],
        coverPhoto: '',
        education: [{
            name: 'Concordia',
            location: 'Montreal',
            startDate: mockedDate
          },
            {name: 'Concordia',
            location: 'Montreal',
            startDate: mockedDate
          }],
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
  };

  it('renders education given user', async () => {
    // const { findByText } = render(<ProfileEducation currentUser={currentUser} />);
  
    // const courseTitle = await findByText('intro to testing', { exact: false });
    // expect(courseTitle).toBeInTheDocument();
  });
  