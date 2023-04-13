import '@testing-library/jest-dom';
import { findByTestId, fireEvent, waitFor } from '@testing-library/react';
import { render } from '@/renderWrapper';
import ExternalApplication from '../ExternalApplication';

it('renders jobs', async () => {
  const { findByText } = render(
    <ExternalApplication
      externalApplications={[
        { name: 'coding', url: 'http://localhost:1' },
        { name: 'juggling', url: 'http://localhost:2' },
        { name: 'eating', url: 'http://localhost:3' },
      ]}
    />
  );
  const skillCode = await findByText('coding', { exact: false });
  const skillJug = await findByText('juggling', { exact: false });
  const skillEat = await findByText('eating', { exact: false });

  expect(skillCode).toBeInTheDocument();
  expect(skillJug).toBeInTheDocument();
  expect(skillEat).toBeInTheDocument();
});

it('can save a job', async () => {
  const mockSet = jest.fn();
  const { findByTestId } = render(
    <ExternalApplication
      externalApplications={[{ name: 'coding', url: 'http://localhost:1' }]}
      isEditable={true}
      // skillsEditing={[true]}
      setApplicationEditing={mockSet}
    />
  );
  const skillsForm = await findByTestId('externalApplications-form');
  fireEvent.submit(skillsForm);
  await waitFor(() => expect(mockSet).toBeCalled());
});

it('can modify a job', async () => {
  const mockSet = jest.fn();
  const { findByTestId } = render(
    <ExternalApplication
      externalApplications={[{ name: 'coding', url: 'http://localhost:1' }]}
      isEditable={true}
      applicationEditing={[true]}
      setApplication={mockSet}
    />
  );
  const editBox = await findByTestId('job-platform-input-0');
  fireEvent.change(editBox, { target: { value: 'karaoke' } });
  await waitFor(() => expect(mockSet).toBeCalled());
});

it('can edit an existing job', async () => {
  const mockClick = jest.fn();
  const { findByTestId } = render(
    <ExternalApplication
      externalApplications={[{ name: 'coding', url: 'http://localhost:1' }]}
      isEditable={true}
      // skillsEditing={[true]}
      setApplicationEditing={mockClick}
    />
  );
  const editButton = await findByTestId('job-edit-0');
  fireEvent.click(editButton);
  await waitFor(() => expect(mockClick).toBeCalled());
});

it('can delete an existing job', async () => {
  const mockSet = jest.fn();
  const mockClick = jest.fn();
  const { findByTestId } = render(
    <ExternalApplication
      externalApplications={[{ name: 'coding', url: 'http://localhost:1' }]}
      isEditable={true}
      applicationEditing={[true]}
      setApplication={mockSet}
      setApplicationEditing={mockClick}
    />
  );
  const deleteButton = await findByTestId('job-delete-button-0');
  fireEvent.click(deleteButton);
  await waitFor(() => expect(mockSet).toBeCalled());
  await waitFor(() => expect(mockClick).toBeCalled());
});

it('can add a job', async () => {
  const mockSet = jest.fn();
  const mockClick = jest.fn();
  const { findByTestId } = render(
    <ExternalApplication
      externalApplications={[{ name: 'coding', url: 'http://localhost:1' }]}
      isEditable={true}
      applicationEditing={[true]}
      setApplication={mockSet}
      setApplicationEditing={mockClick}
    />
  );
  const addButton = await findByTestId('job-add-button');
  fireEvent.click(addButton);
  await waitFor(() => expect(mockSet).toBeCalled());
  await waitFor(() => expect(mockClick).toBeCalled());
});
