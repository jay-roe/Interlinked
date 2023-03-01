import '@testing-library/jest-dom';
import {
  findByTestId,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import ProfileCodingLanguages from '../ProfileCodingLanguages';
import Button from '@/components/Buttons/Button';
import { assert } from 'console';

it('tests the live version', async () => {
  const { findByTestId } = render(
    <ProfileCodingLanguages isEditable={false} codingLanguages={['HTML']} />
  );
  const liveProfile = await findByTestId('live-profile');
  expect(liveProfile).toBeInTheDocument();
});

it('tests render of editable version', async () => {
  const mockSubmit = jest.fn();
  const { findByTestId } = render(
    <ProfileCodingLanguages
      isEditable={true}
      codingLanguages={['HTML']}
      setCodingLanguagesHovering={mockSubmit}
    />
  );
  const codeLangEditable = await findByTestId('editable-profile-form');
  fireEvent.submit(codeLangEditable);
  await waitFor(() => expect(mockSubmit).toBeCalled);
});

it('tests hover state change from true to false upon leaving area', async () => {
  const mockSetHovering = jest.fn();
  const { findByTestId } = render(
    <ProfileCodingLanguages
      isEditable={true}
      codingLanguages={['HTML']}
      codingLanguagesHovering={[true]}
      setCodingLanguagesHovering={mockSetHovering}
    />
  );
  const codeLangHovering = await findByTestId('code-lang-hovering-parent-0');
  fireEvent.mouseLeave(codeLangHovering);
  await waitFor(() => expect(mockSetHovering).toBeCalled());
});

it('tests hover state stays true on continuous hover on name', async () => {
  const mockSetHovering = jest.fn();
  const { findByTestId } = render(
    <ProfileCodingLanguages
      isEditable={true}
      codingLanguages={['HTML']}
      codingLanguagesHovering={[true]}
      setCodingLanguagesHovering={mockSetHovering}
    />
  );
  const codeLangHoveringName = await findByTestId(
    'code-lang-hovering-code-lang-name-0'
  );
  fireEvent.mouseOver(codeLangHoveringName);
  await waitFor(() => expect(mockSetHovering).toBeCalled());
});

it('tests hover state stays true on continuous hover on delete', async () => {
  const mockSetHovering = jest.fn();
  const { findByTestId } = render(
    <ProfileCodingLanguages
      isEditable={true}
      codingLanguages={['HTML']}
      codingLanguagesHovering={[true]}
      setCodingLanguagesHovering={mockSetHovering}
    />
  );
  const codeLangHoveringDelete = await findByTestId(
    'code-lang-hovering-delete-0'
  );
  fireEvent.mouseOver(codeLangHoveringDelete);
  await waitFor(() => expect(mockSetHovering).toBeCalled());
});

it('tests delete code lang button', async () => {
  const mockDelete = jest.fn();
  const { findByTestId } = render(
    <ProfileCodingLanguages
      isEditable={true}
      codingLanguages={['HTML']}
      codingLanguagesHovering={[true]}
      setCodingLanguages={mockDelete}
      setCodingLanguagesHovering={mockDelete}
    />
  );
  const codeLangHoveringDelete = await findByTestId(
    'code-lang-hovering-delete-0'
  );
  fireEvent.click(codeLangHoveringDelete);
  await waitFor(() => expect(mockDelete).toBeCalled);
});

it('tests hover state change from false', async () => {
  const mockSetHovering = jest.fn();
  const { findByTestId } = render(
    <ProfileCodingLanguages
      isEditable={true}
      codingLanguages={['HTML']}
      codingLanguagesHovering={[false]}
      setCodingLanguagesHovering={mockSetHovering}
    />
  );
  const codeLangNotHovering = await findByTestId('code-lang-not-hovering-0');
  fireEvent.mouseOver(codeLangNotHovering);
  await waitFor(() => expect(mockSetHovering).toBeCalled());
});

it('tests new code lang input field', async () => {
  const mockOnChange = jest.fn();
  const { findByTestId } = render(
    <ProfileCodingLanguages
      isEditable={true}
      codingLanguages={['HTML']}
      codingLanguagesHovering={[false, false]}
      setNewCodingLanguage={mockOnChange}
    />
  );
  const newCodeLangInput = await findByTestId('new-code-lang-input');
  fireEvent.change(newCodeLangInput, { target: { value: 'PHP' } });
  await waitFor(() => expect(mockOnChange).toBeCalled());
});

it('tests add code lang button', async () => {
  const mockButton = jest.fn();
  const { findByTestId } = render(
    <ProfileCodingLanguages
      isEditable={true}
      codingLanguages={['HTML']}
      codingLanguagesHovering={[false, false]}
      setCodingLanguages={mockButton}
      setNewCodingLanguage={mockButton}
      setCodingLanguagesHovering={mockButton}
      newCodingLanguage={'Java'}
    />
  );
  const addCodeLangButton = await findByTestId('new-code-lang-button');
  fireEvent.click(addCodeLangButton);
  await waitFor(() => expect(mockButton).toBeCalled());
});
