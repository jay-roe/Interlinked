import '@testing-library/jest-dom';
import 'intersection-observer';
import { render } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import { NotifType } from '@/types/Notification';
import { Timestamp } from 'firebase/firestore';
import NotificationList from '../NotificationList';
import React from 'react';

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case
const mockClick = jest.fn();

// if there's no current user or the user isn't autheniticated, it says you must be logged in to edit your profile
it('all notification types are rendered from the notification list', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: null,
      currentUser: null,
    };
  });

  jest.mock('@/config/firestore', () => ({
    db: jest.fn(),
  }));

  jest.mock('firebase/firestore', () => ({
    doc: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
    getDoc: jest.fn(),
  }));

  jest.mock('react', () => ({
    useEffect: jest.fn(),
  }));

  jest.mock('config/firebase', () => ({
    storage: jest.fn(),
  }));

  const useEffect = jest.spyOn(React, 'useEffect').mockImplementation(() => {});

  const { findByTestId } = render(
    <NotificationList
      notifications={[
        {
          notifType: NotifType.POST,
          context: '',
          sender: '',
          notifTime: Timestamp.now(),
          read: false,
          notificationId: '',
        },
        {
          notifType: NotifType.COMMENT,
          context: '',
          sender: '',
          notifTime: Timestamp.now(),
          read: false,
          notificationId: '',
        },
        {
          notifType: NotifType.LIKE,
          context: '',
          sender: '',
          notifTime: Timestamp.now(),
          read: false,
          notificationId: '',
        },
        {
          notifType: NotifType.LINK_REQ,
          context: '',
          sender: '',
          notifTime: Timestamp.now(),
          read: false,
          notificationId: '',
        },
        {
          notifType: NotifType.LINK_ACC,
          context: '',
          sender: '',
          notifTime: Timestamp.now(),
          read: false,
          notificationId: '',
        },
        {
          notifType: NotifType.DM,
          context: '',
          sender: '',
          notifTime: Timestamp.now(),
          read: false,
          notificationId: '',
        },
      ]}
      setNotifications={mockClick}
    />
  );

  const post = await findByTestId('post-notification');
  expect(post).toBeInTheDocument();

  const comment = await findByTestId('comment-notification');
  expect(comment).toBeInTheDocument();

  const like = await findByTestId('like-notification');
  expect(like).toBeInTheDocument();

  const linkReq = await findByTestId('link-req-notification');
  expect(linkReq).toBeInTheDocument();

  const linkAcc = await findByTestId('link-acc-notification');
  expect(linkAcc).toBeInTheDocument();

  const dm = await findByTestId('dm-notification');
  expect(dm).toBeInTheDocument();
});
