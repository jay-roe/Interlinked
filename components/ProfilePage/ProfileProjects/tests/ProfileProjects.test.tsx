import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import { Timestamp } from 'firebase/firestore';
import ProfileProjects from '../ProfileProjects';
import { render } from '@/renderWrapper';

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

let mockDate = {
  toDate: () => {
    return new Date();
  },
} as unknown as Timestamp;

const fakeUser = {
  name: 'Bob Angelson',
  profilePicture: 'https://via.placeholder.com/100.png',
};

it('renders the live version of profile projects', async () => {
  const { findByTestId } = render(
    <ProfileProjects
      projects={[
        {
          title: 'SOEN390',
          repoLink: 'repolink',
          demoLink: 'demoLink',
          description: 'GAHHHHH!',
          image: 'https://via.placeholder.com/100.png',
          startDate: mockDate,
          endDate: mockDate,
          collaborators: [
            {
              name: 'name',
              profilePicture: 'https://via.placeholder.com/100.png',
              id: '1',
            },
          ],
        },
      ]}
    />
  );
  const proj = await findByTestId('live-proj-0');
  expect(proj).toBeInTheDocument();
});

it('edits a project', async () => {
  const mockSet = jest.fn();
  const { findByTestId } = render(
    <ProfileProjects
      projects={[
        {
          title: 'SOEN390',
          repoLink: 'repolink',
          demoLink: 'demoLink',
          description: 'GAHHHHH!',
          image: 'https://via.placeholder.com/100.png',
          startDate: mockDate,
          endDate: mockDate,
          collaborators: [
            {
              name: 'name',
              profilePicture: 'https://via.placeholder.com/100.png',
              id: '1',
            },
          ],
        },
      ]}
      isEditable={true}
      setProjects={mockSet}
      projectsEditing={[true]}
    />
  );

  const title = await findByTestId('edit-proj-title-0');
  const repoLink = await findByTestId('edit-proj-repoLink-0');
  const demoLink = await findByTestId('edit-proj-demoLink-0');
  const description = await findByTestId('edit-proj-description-0');
  // const image = await findByTestId('edit-proj-image');
  const startDate = await findByTestId('edit-proj-startDate-0');
  const endDate = await findByTestId('edit-proj-endDate-0');
  const collaborators = await findByTestId('edit-proj-collaborators-0');

  fireEvent.change(title, { target: { value: 'something different' } });
  fireEvent.change(repoLink, { target: { value: 'something different' } });
  fireEvent.change(demoLink, { target: { value: 'something different' } });
  fireEvent.change(description, { target: { value: 'something different' } });
  // fireEvent.change(image, { target: { value: 'something different' } });
  fireEvent.change(startDate, { target: { value: mockDate } });
  fireEvent.change(endDate, { target: { value: mockDate } });
  fireEvent.change(collaborators, {
    target: {
      value: {
        name: 'name',
        profilePicture: 'https://via.placeholder.com/100.png',
        id: '1',
      },
    },
  });
  await waitFor(() => expect(mockSet).toBeCalledTimes(7));
});

it('renders the editable version of profile project', async () => {
  const { findByTestId } = render(
    <ProfileProjects
      projects={[
        {
          title: 'SOEN390',
          repoLink: 'repolink',
          demoLink: 'demoLink',
          description: 'GAHHHHH!',
          image: 'https://via.placeholder.com/100.png',
          startDate: mockDate,
          endDate: mockDate,
          collaborators: [
            {
              name: 'name',
              profilePicture: 'https://via.placeholder.com/100.png',
              id: '1',
            },
          ],
        },
      ]}
      isEditable={true}
    />
  );

  const projs = await findByTestId('editable-proj');
  expect(projs).toBeInTheDocument();
});

it('tests the project save button', async () => {
  const mockClick = jest.fn();
  const { findByTestId } = render(
    <ProfileProjects
      projects={[
        {
          title: 'SOEN390',
          repoLink: 'repolink',
          demoLink: 'demoLink',
          description: 'GAHHHHH!',
          image: 'https://via.placeholder.com/100.png',
          startDate: mockDate,
          endDate: mockDate,
          collaborators: [
            {
              name: 'name',
              profilePicture: 'https://via.placeholder.com/100.png',
              id: '1',
            },
          ],
        },
      ]}
      isEditable={true}
      projectsEditing={[true]}
      setProjectsEditing={mockClick}
    />
  );

  const saveButton = await findByTestId('proj-save-button-0');
  fireEvent.submit(saveButton);
  await waitFor(() => expect(mockClick).toBeCalledTimes(1));
});

it('tests the project edit button', async () => {
  const mockClick = jest.fn();
  const { findByTestId } = render(
    <ProfileProjects
      projects={[
        {
          title: 'SOEN390',
          repoLink: 'repolink',
          demoLink: 'demoLink',
          description: 'GAHHHHH!',
          image: 'https://via.placeholder.com/100.png',
          startDate: mockDate,
          endDate: mockDate,
          collaborators: [
            {
              name: 'name',
              profilePicture: 'https://via.placeholder.com/100.png',
              id: '1',
            },
          ],
        },
      ]}
      isEditable={true}
      setProjectsEditing={mockClick}
    />
  );

  const editButton = await findByTestId('proj-edit-button-0');
  fireEvent.click(editButton);
  await waitFor(() => expect(mockClick).toBeCalledTimes(1));
});

it('tests the project delete button', async () => {
  const mockClick = jest.fn();
  const { findByTestId } = render(
    <ProfileProjects
      projects={[
        {
          title: 'SOEN390',
          repoLink: 'repolink',
          demoLink: 'demoLink',
          description: 'GAHHHHH!',
          image: 'https://via.placeholder.com/100.png',
          startDate: mockDate,
          endDate: mockDate,
          collaborators: [
            {
              name: 'name',
              profilePicture: 'https://via.placeholder.com/100.png',
              id: '1',
            },
          ],
        },
      ]}
      isEditable={true}
      setProjects={mockClick}
      setProjectsEditing={mockClick}
    />
  );

  const deleteButton = await findByTestId('proj-delete-button-0');
  fireEvent.click(deleteButton);
  await waitFor(() => expect(mockClick).toBeCalledTimes(2));
});

it('tests the experience delete button', async () => {
  const mockClick = jest.fn();
  const { findByTestId } = render(
    <ProfileProjects
      projects={[
        {
          title: 'SOEN390',
          repoLink: 'repolink',
          demoLink: 'demoLink',
          description: 'GAHHHHH!',
          image: 'https://via.placeholder.com/100.png',
          startDate: mockDate,
          endDate: mockDate,
          collaborators: [
            {
              name: 'name',
              profilePicture: 'https://via.placeholder.com/100.png',
              id: '1',
            },
          ],
        },
      ]}
      isEditable={true}
      setProjects={mockClick}
      setProjectsEditing={mockClick}
    />
  );

  const addButton = await findByTestId('proj-add-button');
  fireEvent.click(addButton);
  await waitFor(() => expect(mockClick).toBeCalledTimes(2));
});
