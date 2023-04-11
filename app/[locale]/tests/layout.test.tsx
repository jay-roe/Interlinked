import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import RootLayout from '../layout';

jest.mock('contexts/AuthContext', () => ({
  AuthProvider: ({ children }) => '<div>{children}</div>', // create mock function
}));

// jest.mock('contexts/AuthContext', () => ({
//   useAuth: jest.fn(),
// }));

// jest.mock('config/firebase', () => ({
//   storage: jest.fn(),
// }));

// jest.mock('firebase/storage', () => ({
//   getStorage: jest.fn(),
//   getDownloadURL: jest.fn(),
//   ref: jest.fn(),
//   uploadBytesResumable: jest.fn(),
// }));

// jest.mock('firebase/firestore', () => ({
//   doc: jest.fn(),
//   setDoc: jest.fn(),
//   updateDoc: jest.fn(),
//   collection: () => {
//     return {
//       withConverter: jest.fn(),
//     };
//   },
// }));

it('renders the root', async () => {
  const { findByTestId } = render(<RootLayout> </RootLayout>);

  const root = await findByTestId('root-container');
  expect(root).toBeInTheDocument();
});
