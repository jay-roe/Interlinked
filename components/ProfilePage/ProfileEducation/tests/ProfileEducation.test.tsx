import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Timestamp } from 'firebase/firestore';
import ProfileEducation from '../ProfileEducation';

let mockedDate = {
  toDate: () => {
    return new Date();
  },
} as unknown as Timestamp;

jest.mock('@/config/firestore', () => ({
  db: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  updateDoc: jest.fn(),
}));

const education = [
  {
    name: 'Concordia',
    program: 'underwater basket weaving',
    location: 'Montreal',
    startDate: mockedDate,
    endDate: mockedDate,
  },
  { name: 'McGill', program: 'underwater basket weaving2', location: 'Montreal', startDate: mockedDate },
]

it('renders education given user', async () => {
  const { findByText } = render(<ProfileEducation education={education} />);

  const courseTitle = await findByText('Concordia', { exact: false });
  expect(courseTitle).toBeInTheDocument();
});
