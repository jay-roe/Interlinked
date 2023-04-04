import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import MessageModal from '../MessageModal';
import 'intersection-observer';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

it('renders message modal', async () => {
  const { findByTestId } = render(<MessageModal userUID={''} userName={''} />);

  const messageModal = await findByTestId('message-modal');

  const modalButton = await findByTestId('modal-button');

  expect(messageModal).toBeInTheDocument();
  fireEvent.click(modalButton);

  const openModal = await findByTestId('create-modal-button');

  expect(openModal).toBeInTheDocument();
  fireEvent.click(modalButton);
});
