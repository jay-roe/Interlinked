import '@testing-library/jest-dom';
import 'intersection-observer';
import { render } from '@testing-library/react';
import React from 'react';
import FullJobCard from '../FullJobCard';
import { JobPosting, JobType } from '@/types/JobPost';
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/config/firestore', () => ({
  db: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  updateDoc: jest.fn(),
}));

let dateMock = {
  toDate: () => {
    return new Date();
  },
} as unknown as Timestamp;

it('check if full job card renders', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: {},
      currentUser: {},
    };
  });

  const mockSetJobs = jest.fn();

  const { findByTestId } = render(
    <FullJobCard
      job={{
        title: '',
        description: '',
        companyId: '',
        companyName: '',
        companyProfilePic: '',
        datePosted: dateMock,
        skills: ['hello', 'hi'],
        location: '',
        deadline: dateMock,
        cvRequired: false,
        coverLetterRequired: false,
        externalApplications: [],
        hidden: false,
        applications: [],
        jobType: JobType.FULLTIME,
      }}
      setJob={mockSetJobs}
    />
  );
});
