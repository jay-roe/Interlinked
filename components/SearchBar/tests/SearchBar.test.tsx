import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import SearchBar from '../SearchBar';

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
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
  updateDoc: jest.fn(),
  collection: () => {
    return {
      withConverter: jest.fn(),
    };
  },
}));

jest.mock('@/config/firestore', () => ({
  db: jest.fn(),
}));

it('renders search bar with search button', async () => {
  const { findByTestId } = render(<SearchBar />);
  const searchButton = await findByTestId('search-button');
  expect(searchButton).toBeInTheDocument();
});

it('test handleChange setSearchTerm', async () => {
  const { findByTestId } = render(<SearchBar />);
  const searchTerm = await findByTestId('search-button');
  fireEvent.change(searchTerm, { target: { value: 'test' } });
  expect((searchTerm as HTMLInputElement).value).toBe('test');
});
