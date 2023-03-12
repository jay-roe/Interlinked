import { useAuth } from '@/contexts/AuthContext';
import { createNotification } from '@/components/Notification/AddNotification/AddNotification';
import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ViewLinkButton from '../ViewLinkButton';

it('renders edit button correctly', async () => {
  const { findByTestId } = render(<ViewLinkButton linkedUserIds={[]} />);

  const button = await findByTestId('view-link-button');
  expect(button).toBeInTheDocument();
});
