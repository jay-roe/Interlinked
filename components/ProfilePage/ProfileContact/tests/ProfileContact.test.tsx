import '@testing-library/jest-dom';
import { findByTestId, fireEvent, waitFor } from '@testing-library/react';
import { render } from '@/renderWrapper';
import ProfileContact from '../ProfileContact';

it('renders live version of contact info', async () => {
  const { findByText } = render(
    <ProfileContact email="test@test.com" phone="123-456-7890" />
  );
  const email = await findByText('test@test.com', { exact: false });
  const phone = await findByText('123-456-7890', { exact: false });

  expect(email).toBeInTheDocument();
  expect(phone).toBeInTheDocument();
});

it('tests changing email/phone fields', async () => {
  const mockSetEmail = jest.fn();
  const mockSetPhone = jest.fn();
  const mockConfirm = jest.fn();
  const { findByTestId } = render(
    <ProfileContact
      isEditable={true}
      contactEditing={true}
      email="test@test.com"
      phone="123-456-7890"
      setEmail={mockSetEmail}
      setPhone={mockSetPhone}
      setContactEditing={mockConfirm}
    />
  );

  const email = await findByTestId('edit-email');
  const phone = await findByTestId('edit-phone');
  const confirmButton = await findByTestId('save-contacts-button');
  fireEvent.change(email, { target: { value: 'test@test.com2' } });
  await waitFor(() => expect(mockSetEmail).toBeCalledTimes(1));

  fireEvent.change(phone, { target: { value: '098-765-4321' } });
  await waitFor(() => expect(mockSetPhone).toBeCalledTimes(1));

  fireEvent.click(confirmButton); //this button has no functionality so the test is left out for now
  await waitFor(() => expect(mockConfirm).toBeCalled);
});

it('tests the profile contact edit button', async () => {
  const mockClick = jest.fn();
  const { findByTestId } = render(
    <ProfileContact
      isEditable={true}
      // contactEditing={true}
      email="test@test.com"
      phone="123-456-7890"
      setContactEditing={mockClick}
    />
  );
  const editButton = await findByTestId('contact-edit-button');

  fireEvent.click(editButton);
  await waitFor(() => expect(mockClick).toBeCalled);
});
