import { useAuth } from '@/contexts/AuthContext';
import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';

import { Timestamp } from 'firebase/firestore';
import Feeds from '../page';
import React from 'react';
import { User } from '@/types/User';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/config/firestore', () => ({
  db: jest.fn(),
  typeCollection: jest.fn(),
}));

jest.mock('config/firebase', () => ({
  storage: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
  getDownloadURL: jest.fn(),
  ref: jest.fn(),
  uploadBytesResumable: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  getDocs: jest.fn().mockResolvedValue({ docs: [], forEach: jest.fn() }),
  orderBy: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  collection: () => {
    return {
      withConverter: jest.fn(),
    };
  },
}));

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case

let mockedDate = {
  toDate: () => {
    return new Date();
  },
} as unknown as Timestamp;

const currentUser = {
  awards: [],
  codingLanguages: [],
  courses: [],
  education: [],
  email: '',
  experience: [],
  languages: [],
  linkedUserIds: [],
  name: '',
  projects: [],
  recommendations: [],
  skills: [],
  volunteering: [],
} satisfies User;

const authorWithId = { userId: '123', ...currentUser };

const post = {
  authorID: '123',
  author: 'John',
  title: '',
  text_content: '',
  image_content: '',
  likes: [],
  comments: [],
  date: mockedDate,
  meta_tags: [],
};

const postWithId = { postId: '0101', ...post };

it('renders page with no user or loading', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: null,
    };
  });
  const { findByTestId } = render(<Feeds />);

  const feedNoUser = await findByTestId('base-msg');
  expect(feedNoUser).toBeInTheDocument();
});

it('renders page with user and no loading', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: {
        profilePicture: '',
        name: 'John',
        email: '',
        bio: '',
        linkedUserIds: [],
        languages: [],
        education: [],
        courses: [],
        experience: [],
        projects: [],
        skills: [],
        awards: [],
      },
      authUser: {
        uid: '123',
      },
    };
  });
  const { findByTestId } = render(<Feeds />);

  const feedNoUser = await findByTestId('welcome-msg');
  expect(feedNoUser).toBeInTheDocument();
});

it('renders page with a post', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: {
        profilePicture: '',
        name: 'John',
        email: '',
        bio: '',
        linkedUserIds: [],
        languages: [],
        education: [],
        courses: [],
        experience: [],
        projects: [],
        skills: [],
        awards: [],
      },
      authUser: {
        uid: '1234',
      },
    };
  });

  jest
    .spyOn(React, 'useState')
    .mockImplementationOnce(() => [false, jest.fn()]) //loading state
    .mockImplementationOnce(() => [[postWithId], jest.fn()]) //post with id state
    .mockImplementationOnce(() => [[authorWithId], jest.fn()]) //authors with id state
    .mockImplementationOnce(() => [true, jest.fn()]); //posts left state
  const { findByTestId } = render(<Feeds />);

  const loadMore = await findByTestId('load-more-button');
  expect(loadMore).toBeInTheDocument();
});

// it('renders page with user and loading', async () => {
//   mockedUseAuth.mockImplementation(() => {
//     return {
//       currentUser: {
//         profilePicture: '',
//         name: 'John',
//         email: '',
//         bio: '',
//         connections: [],
//         languages: [],
//         education: [],
//         courses: [],
//         experience: [],
//         projects: [],
//         skills: [],
//         awards: [],
//       },
//     };
//   });
//   mockedQuery.mockImplementation(() => {
//     return {
//       orderBy: jest.fn(),
//     };
//   });
//   mockedGetDocs.mockImplementation(() => {
//     return Promise.resolve({
//       docs: [
//         {
//           id: '123',
//           data: () => {
//             return {
//               authorID: '123',
//               author: 'John',
//               title: 'Test',
//               text_content: 'Test',
//               image_content: '',
//               likes: [],
//               comments: [],
//               date: mockedDate,
//               meta_tags: [],
//             };
//           },
//         },
//       ],
//     });
//   });
//   const { findByTestId } = render(<Feeds />);

//   const feedUser = await findByTestId('welcome-msg');
//   expect(feedUser).toBeInTheDocument();
// });
