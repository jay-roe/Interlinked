import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '@/renderWrapper';
import ProfileDocuments from '../ProfileDocuments';

const fakeDocumentRes = {
  name: 'resume',
  link: '',
  isPrivate: false,
};
const fakeDocumentCov = {
  name: 'cover',
  link: '',
  isPrivate: false,
};

it('render profile document', async () => {
  const mockSetCoverLetter = jest.fn();
  const mockSetResume = jest.fn();
  const mocksetCoverLetterEditing = jest.fn();
  const mocksetResumeEditing = jest.fn();

  const { findByTestId } = render(
    <ProfileDocuments
      isEditable={true}
      resume={fakeDocumentRes}
      coverLetter={fakeDocumentCov}
      setCoverLetter={mockSetCoverLetter}
      setResume={mockSetResume}
      resumeEditing={true}
      coverLetterEditing={true}
      setCoverLetterEditing={mocksetCoverLetterEditing}
      setResumeEditing={mocksetResumeEditing}
      uid=""
    />
  );

  const resume = await findByTestId('input-resume');
  //expect(resume).toBeInTheDocument();

  const resInput = await findByTestId('change-resume-name');

  const deleteRes = await findByTestId('delete-resume-btn');

  const saveRes = await findByTestId('resume-save-btn');

  fireEvent.change(resume, { target: { value: '' } });
  await waitFor(() => expect(mockSetResume).toBeCalled);

  fireEvent.change(resInput, { target: { value: '' } });
  await waitFor(() => expect(mockSetResume).toBeCalled);

  fireEvent.change(deleteRes, { target: { value: '' } });
  await waitFor(() => expect(mocksetResumeEditing).toBeCalled);

  fireEvent.change(saveRes, { target: { value: '' } });
  await waitFor(() => expect(mocksetResumeEditing).toBeCalled);

  const coverInput = await findByTestId('change-cover-name');
  fireEvent.change(coverInput, { target: { value: '' } });
  await waitFor(() => expect(mockSetCoverLetter).toBeCalled);

  const deleteCover = await findByTestId('delete-cover-letter-btn');
  fireEvent.change(coverInput, { target: { value: '' } });
  await waitFor(() => expect(mockSetCoverLetter).toBeCalled);

  const saveCover = await findByTestId('cover-letter-save-btn');
  fireEvent.change(coverInput, { target: { value: '' } });
  await waitFor(() => expect(mockSetCoverLetter).toBeCalled);
});

it('tests the profile  edit button', async () => {
  const mockSetCoverLetter = jest.fn();
  const mockSetResume = jest.fn();
  const mocksetCoverLetterEditing = jest.fn();
  const mocksetResumeEditing = jest.fn();

  const { findByTestId } = render(
    <ProfileDocuments
      isEditable={true}
      resume={null}
      coverLetter={null}
      setCoverLetter={mockSetCoverLetter}
      setResume={mockSetResume}
      resumeEditing={false}
      coverLetterEditing={true}
      setCoverLetterEditing={mocksetCoverLetterEditing}
      setResumeEditing={mocksetResumeEditing}
      uid=""
    />
  );

  const addCoverButton = await findByTestId('doc-add-cover-letter-button');

  fireEvent.click(addCoverButton);
  await waitFor(() => expect(mockSetCoverLetter).toBeCalled);

  const addResumeButton = await findByTestId('doc-add-resume-button');

  fireEvent.click(addResumeButton);
  await waitFor(() => expect(mockSetResume).toBeCalled);
});

it('tests the profile  edit button', async () => {
  const mockClick = jest.fn();
  const mockSetCoverLetter = jest.fn();
  const mockSetResume = jest.fn();
  const mocksetCoverLetterEditing = jest.fn();
  const mocksetResumeEditing = jest.fn();
  const mockUploadFile = jest.fn();

  const { findByTestId } = render(
    <ProfileDocuments
      isEditable={true}
      resume={fakeDocumentRes}
      coverLetter={fakeDocumentCov}
      setCoverLetter={mockSetCoverLetter}
      setResume={mockSetResume}
      resumeEditing={false}
      coverLetterEditing={false}
      setCoverLetterEditing={mocksetCoverLetterEditing}
      setResumeEditing={mocksetResumeEditing}
      uid=""
    />
  );

  const editResumeButton = await findByTestId('resume-edit-button');

  fireEvent.click(editResumeButton);
  await waitFor(() => expect(mocksetResumeEditing).toBeCalled);

  const editCoverButton = await findByTestId('cover-letter-edit-button');

  fireEvent.click(editCoverButton);
  await waitFor(() => expect(mocksetCoverLetterEditing).toBeCalled);
});

it('tests the profile  edit button', async () => {
  const mockSetCoverLetter = jest.fn();
  const mockSetResume = jest.fn();
  const mocksetCoverLetterEditing = jest.fn();
  const mocksetResumeEditing = jest.fn();
  const { findByTestId } = render(
    <ProfileDocuments
      isEditable={true}
      resume={fakeDocumentRes}
      coverLetter={fakeDocumentCov}
      setCoverLetter={mockSetCoverLetter}
      setResume={mockSetResume}
      resumeEditing={true}
      coverLetterEditing={true}
      setCoverLetterEditing={mocksetCoverLetterEditing}
      setResumeEditing={mocksetResumeEditing}
      uid=""
    />
  );

  const resumeName = await findByTestId('change-resume-name');
  expect(resumeName).toBeInTheDocument();

  const coverName = await findByTestId('change-cover-name');
  expect(coverName).toBeInTheDocument();
});
