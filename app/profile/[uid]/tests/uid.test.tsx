import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import ViewProfile from '../page';
import { useRouter } from 'next/navigation';

/* you gonna need these for the could not import stmt from outside module error
jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/config/firestore', () => ({
  db: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  updateDoc: jest.fn(),
}));
*/

it('renders', async () => {
  //const { findByTestId } = render(
  /* @ts-expect-error Server Component */
  //  <ViewProfile params={} />
  //);
  /*const profile = await findByTestId('profile');
  expect(profile).toBeInTheDocument();*/
});
