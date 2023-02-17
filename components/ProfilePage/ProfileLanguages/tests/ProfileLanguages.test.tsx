import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ProfileLanguages from '../ProfileLanguages';

const currentUser = {
    awards: [],
    codingLanguages: [],
    connections: [],
    courses: [],
    education: [],
    email: '',
    experience: [],
    languages: ['english', 'french'],
    name: '',
    projects: [],
    recommendations: [],
    skills: [],
    volunteering: [],
  };

  it('renders languages given user', async () => {
    const { findByText } = render(<ProfileLanguages currentUser={currentUser} />);
  
    const language = await findByText('french', { exact: false });
    expect(language).toBeInTheDocument();
  });
  