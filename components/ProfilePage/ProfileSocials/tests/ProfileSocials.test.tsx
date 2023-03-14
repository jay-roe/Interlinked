import '@testing-library/jest-dom';
import {
  findAllByTestId,
  findByTestId,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import ProfileSocials from '../ProfileSocials';
import { assert } from 'console';

it('verifies social links are present in the live version', async () => {
  const { findByTestId } = render(
    <ProfileSocials
      socials={{
        github: 'gitlink',
        instagram: 'instalink',
      }}
    />
  );
  const githubLink = await findByTestId('socials-gitlink');
  const instagramLink = await findByTestId('socials-instalink');

  expect(githubLink.getAttribute('href')).toBe('gitlink');
  expect(instagramLink.getAttribute('href')).toBe('instalink');
});

it('tests socials case: not editing and at least one social exists', async () => {
  const { findByTestId } = render(
    <ProfileSocials
      isEditable={true}
      socials={{
        github: 'gitlink',
      }}
      // socialsEditing={false}
    />
  );
  const exists = await findByTestId('socials');
  expect(exists).toBeInTheDocument();
});

it('tests socials case: not editing and no social exists', async () => {
  const { findByTestId } = render(
    <ProfileSocials
      socials={{}} // check to see if socials needs to be defined as empty
      isEditable={true}
      // socialsEditing={false}
    />
  );
  const exists = await findByTestId('not-editing-no-socials');
  expect(exists).toBeInTheDocument();
});

it('edits the github link', async () => {
  const mockSet = jest.fn();
  const { findByTestId } = render(
    <ProfileSocials
      socials={{
        github: 'gitlink',
      }}
      isEditable={true}
      socialsEditing={true}
      setSocials={mockSet}
    />
  );
  const editgit = await findByTestId('edit-github');
  fireEvent.change(editgit, { target: { value: 'anotherGitLink' } });
  expect(mockSet).toBeCalledTimes(1);
});

it('edits the instagram link', async () => {
  const mockSet = jest.fn();
  const { findByTestId } = render(
    <ProfileSocials
      socials={{
        // Can I put a github element here? -> why not: might cause duplicate data-testid's to exist in the page
        instagram: 'instalink',
      }}
      isEditable={true}
      socialsEditing={true}
      setSocials={mockSet}
    />
  );
  const editgit = await findByTestId('edit-instagram');
  fireEvent.change(editgit, { target: { value: 'anotherInstaLink' } });
  expect(mockSet).toBeCalledTimes(1);
});

it('can start editing the socials', async () => {
  const mockSet = jest.fn();
  const { findByTestId } = render(
    <ProfileSocials
      isEditable={true}
      // socialsEditing={false}
      setSocialsEditing={mockSet}
    />
  );
  const editButton = await findByTestId('socials-edit-button');
  fireEvent.click(editButton);
  expect(mockSet).toBeCalledTimes(1);
});
