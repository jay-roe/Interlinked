import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';
import SocialIconGroup from '../SocialIconGroup';

it('Social icon group renders', async () => {
  const { findByTestId } = render(
    <SocialIconGroup
      socials={{
        github: '',
        instagram: '',
      }}
    />
  );
  const socials = await findByTestId('socials');
  expect(socials).toBeInTheDocument();
});
