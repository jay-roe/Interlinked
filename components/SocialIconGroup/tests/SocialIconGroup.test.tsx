import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import SocialIconGroup from '../SocialIconGroup';

it('check if SocialIconGroup renders correctly', async () => {

    const { findByTestId } = render(
        <SocialIconGroup socials={{
            github: '',
            instagram: ''
        }} />
    );

    const socialsContainer = await findByTestId('social-icon-group-container');
    expect(socialsContainer).toBeInTheDocument();
})