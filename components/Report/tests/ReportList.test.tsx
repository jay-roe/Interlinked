import '@testing-library/jest-dom';
import 'intersection-observer';
import { render } from '@/renderWrapper';

import { Timestamp } from 'firebase/firestore';
import React from 'react';
import ReportList from '../ReportList';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  push: jest.fn(),
}));

const mockedRouter = useRouter as jest.Mock<any>;

// if there's no current user or the user isn't autheniticated, it says you must be logged in to edit your profile
it('all reports types are rendered from the report list', async () => {
  const mockNav = jest.fn();
  mockedRouter.mockImplementation(() => ({
    push: mockNav,
  }));

  const { findByTestId } = render(
    <ReportList
      reports={[
        {
          context: 'this is your first warning',
          reporter: '',
          reporterName: '',
          reported: '',
          reportedName: '',
          reportTime: Timestamp.now(),
          read: true,
        },
      ]}
    />
  );

  const report = await findByTestId('live-reports');
  expect(report).toBeInTheDocument();
});
