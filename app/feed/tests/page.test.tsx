import CardGrid from '@/components/Card/CardGrid';
import FullPostCard from '@/components/Card/FullPostCard';
import { db } from '@/config/firestore';
import { useAuth } from '@/contexts/AuthContext';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { getDocs, query, Timestamp } from 'firebase/firestore';
import Feeds from '../page';

jest.mock('@/config/firestore', () => ({
  db: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  updateDoc: jest.fn(),
  getDocs: jest.fn().mockResolvedValue({ docs: [] }),
  orderBy: jest.fn(),
  query: jest.fn(),
}));

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case
const mockedQuery = query as jest.Mock<any>;
const mockedGetDocs = getDocs as jest.Mock<any>;

let mockedDate = {
  toDate: () => {
    return new Date();
  },
} as unknown as Timestamp;

const currentUser = {
  awards: [],
  codingLanguages: [],
  connections: [],
  courses: [],
  education: [],
  email: '',
  experience: [],
  languages: [],
  name: '',
  projects: [],
  recommendations: [],
  skills: [],
  volunteering: [],
};

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
        connections: [],
        languages: [],
        education: [],
        courses: [],
        experience: [],
        projects: [],
        skills: [],
        awards: [],
      },
    };
  });
  const { findByTestId } = render(<Feeds />);

  const feedNoUser = await findByTestId('base-msg');
  expect(feedNoUser).toBeInTheDocument();
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
