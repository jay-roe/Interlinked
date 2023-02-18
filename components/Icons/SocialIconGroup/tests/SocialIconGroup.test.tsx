import '@testing-library/jest-dom'
import { useAuth } from '@/contexts/AuthContext';
import { findByTestId, fireEvent, render, waitFor } from '@testing-library/react';
import SocialIconGroup from '../SocialIconGroup';

it('Social icon group renders', async () => {
    
    const { findByTestId } = render(
            <SocialIconGroup socials={{
            github: '',
            instagram: ''
        }} />
    );
    const socials = await findByTestId("socials");
    expect(socials).toBeInTheDocument();
});
