import '@testing-library/jest-dom';
import 'intersection-observer';
import { render } from '@/renderWrapper';

import { Timestamp } from 'firebase/firestore';
import React from 'react';
import ReportList from '../ReportList';
import { useRouter } from 'next/navigation';
import ReportMessageCard from '../ReportMessageCard';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  push: jest.fn(),
}));

const mockedRouter = useRouter as jest.Mock<any>;

it('report message card renders when reporter name = sender name', async () => {
  const mockNav = jest.fn();
  mockedRouter.mockImplementation(() => ({
    push: mockNav,
  }));

  const { findByTestId } = render(
    <ReportMessageCard
      message={{
        content: '',
        sender: {
          name: 'hi',
          profilePicture: '',
        },
        time_stamp: Timestamp.now(),
      }}
      report={{
        context: '',
        reporter: '',
        reporterName: 'hi',
        reported: '',
        reportedName: '',
        reportTime: Timestamp.now(),
        read: false,
        chatroomId: '',
        reportId: '',
      }}
    />
  );

  const reportCardSender = await findByTestId('report-card-sender');
  expect(reportCardSender).toBeInTheDocument();
});

it('report message card renders when reporter name != sender name', async () => {
  const mockNav = jest.fn();
  mockedRouter.mockImplementation(() => ({
    push: mockNav,
  }));

  const { findByTestId } = render(
    <ReportMessageCard
      message={{
        content: '',
        sender: {
          name: 'hi',
          profilePicture: '',
        },
        time_stamp: Timestamp.now(),
      }}
      report={{
        context: '',
        reporter: '',
        reporterName: 'hey',
        reported: '',
        reportedName: '',
        reportTime: Timestamp.now(),
        read: false,
        chatroomId: '',
        reportId: '',
      }}
    />
  );

  const reportCardSender = await findByTestId('report-card-sender');
  expect(reportCardSender).toBeInTheDocument();
});
