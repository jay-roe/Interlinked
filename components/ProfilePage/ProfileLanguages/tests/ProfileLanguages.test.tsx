import '@testing-library/jest-dom';
import { findByTestId, fireEvent, waitFor } from '@testing-library/react';
import ProfileLanguages from '../ProfileLanguages';
import { render } from '@/renderWrapper';

it('tests the live version', async () => {
  const { findByTestId } = render(
    <ProfileLanguages isEditable={false} languages={[{ title: 'english' }]} />
  );
  const liveProfile = await findByTestId('live-lang-profile');
  expect(liveProfile).toBeInTheDocument();
});

it('tests render of editable version', async () => {
  const mockSubmit = jest.fn();
  const { findByTestId } = render(
    <ProfileLanguages
      isEditable={true}
      languages={[{ title: 'english' }]}
      setLanguagesHovering={mockSubmit}
      newLanguage={{ title: 'français' }}
    />
  );
  const LangEditable = await findByTestId('editable-lang-form');
  fireEvent.submit(LangEditable);
  await waitFor(() => expect(mockSubmit).toBeCalled);
});

it('tests hover state change from true to false upon leaving area', async () => {
  const mockSetHovering = jest.fn();
  const { findByTestId } = render(
    <ProfileLanguages
      isEditable={true}
      languages={[{ title: 'english' }]}
      languagesHovering={[true]}
      setLanguagesHovering={mockSetHovering}
      newLanguage={{ title: 'français' }}
    />
  );
  const LangHovering = await findByTestId('lang-hovering-parent-0');
  fireEvent.mouseLeave(LangHovering);
  await waitFor(() => expect(mockSetHovering).toBeCalled());
});

it('tests hover state stays true on continuous hover on name', async () => {
  const mockSetHovering = jest.fn();
  const { findByTestId } = render(
    <ProfileLanguages
      isEditable={true}
      languages={[{ title: 'english' }]}
      languagesHovering={[true]}
      setLanguagesHovering={mockSetHovering}
      newLanguage={{ title: 'français' }}
    />
  );
  const LangHoveringName = await findByTestId('lang-hovering-lang-name-0');
  fireEvent.mouseOver(LangHoveringName);
  await waitFor(() => expect(mockSetHovering).toBeCalled());
});

it('tests hover state stays true on continuous hover on delete', async () => {
  const mockSetHovering = jest.fn();
  const { findByTestId } = render(
    <ProfileLanguages
      isEditable={true}
      languages={[{ title: 'english' }]}
      languagesHovering={[true]}
      setLanguagesHovering={mockSetHovering}
      newLanguage={{ title: 'français' }}
    />
  );
  const LangHoveringDelete = await findByTestId('lang-hovering-delete-0');
  fireEvent.mouseOver(LangHoveringDelete);
  await waitFor(() => expect(mockSetHovering).toBeCalled());
});

it('tests delete  lang button', async () => {
  const mockDelete = jest.fn();
  const { findByTestId } = render(
    <ProfileLanguages
      isEditable={true}
      languages={[{ title: 'english' }]}
      languagesHovering={[true]}
      setLanguages={mockDelete}
      setLanguagesHovering={mockDelete}
      newLanguage={{ title: 'français' }}
    />
  );
  const LangHoveringDelete = await findByTestId('lang-hovering-delete-0');
  fireEvent.click(LangHoveringDelete);
  await waitFor(() => expect(mockDelete).toBeCalled);
});

it('tests hover state change from false', async () => {
  const mockSetHovering = jest.fn();
  const { findByTestId } = render(
    <ProfileLanguages
      isEditable={true}
      languages={[{ title: 'english' }]}
      languagesHovering={[false]}
      setLanguagesHovering={mockSetHovering}
      newLanguage={{ title: 'français' }}
    />
  );
  const LangNotHovering = await findByTestId('lang-not-hovering-0');
  fireEvent.mouseOver(LangNotHovering);
  await waitFor(() => expect(mockSetHovering).toBeCalled());
});

it('tests new  lang input field', async () => {
  const mockOnChange = jest.fn();
  const { findByTestId } = render(
    <ProfileLanguages
      isEditable={true}
      languages={[{ title: 'english' }]}
      languagesHovering={[false, false]}
      setNewLanguage={mockOnChange}
      newLanguage={{ title: 'français' }}
    />
  );
  const newLangInput = await findByTestId('new-lang-input');
  fireEvent.change(newLangInput, { target: { value: 'PHP' } });
  await waitFor(() => expect(mockOnChange).toBeCalled());
});

it('tests add  lang button', async () => {
  const mockButton = jest.fn();
  const { findByTestId } = render(
    <ProfileLanguages
      isEditable={true}
      languages={[{ title: 'english' }]}
      languagesHovering={[false]}
      setLanguages={mockButton}
      setNewLanguage={mockButton}
      setLanguagesHovering={mockButton}
      newLanguage={{ title: 'français' }}
    />
  );
  const addLangButton = await findByTestId('new-lang-button');
  fireEvent.click(addLangButton);
  await waitFor(() => expect(mockButton).toBeCalled());
});
