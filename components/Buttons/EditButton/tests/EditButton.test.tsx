import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import EditButton from '../EditButton';

it('renders edit button correctly', async () => {
  const { findByTestId } = render(<EditButton />);

  const button = await findByTestId('edit-button');
  expect(button).toBeInTheDocument();
});
