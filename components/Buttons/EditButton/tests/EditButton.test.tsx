import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import EditButton from '../EditButton';

it('renders edit button correctly', async () => {
  const { findByTestId } = render(<EditButton />);

  const icon = await findByTestId('edit-icon');
  expect(icon).toBeInTheDocument();
});
