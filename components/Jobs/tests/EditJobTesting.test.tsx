import '@testing-library/jest-dom';
import { useAuth } from '@/contexts/AuthContext';
import { render, fireEvent } from '@testing-library/react';
import EditJobPosting from '../EditJobPosting';
import { FiRefreshCcw } from 'react-icons/fi';

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
  Timestamp: {
    fromMillis: jest.fn(),
  },
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

mockedUseAuth.mockImplementation(() => {
  return {
    authUser: null,
    currentUser: { isCompany: true },
  };
});

it('render edit job', async () => {
  const { findByTestId } = render(<EditJobPosting newJob={true} />);

  const changeTitle = await findByTestId('change-title');
  expect(changeTitle).toBeInTheDocument();
});

it('presses buttons', async () => {
  const { findByTestId } = render(<EditJobPosting newJob={true} />);
  const cv = await findByTestId('cv-check');
  expect(cv).toBeInTheDocument();
  const coverletter = await findByTestId('coverletter-check');
  expect(coverletter).toBeInTheDocument();
  const hidden = await findByTestId('hidden-check');
  expect(hidden).toBeInTheDocument();
  const external = await findByTestId('external-check');
  expect(external).toBeInTheDocument();

  fireEvent.click(cv);
  fireEvent.click(coverletter);
  fireEvent.click(hidden);
  fireEvent.click(external);

  expect(cv).toBeChecked;
  expect(coverletter).toBeChecked;
  expect(hidden).toBeChecked;
  expect(external).toBeChecked;

  const submit = await findByTestId('new-job-submit');
  expect(submit).toBeInTheDocument();

  fireEvent.click(submit);
});
