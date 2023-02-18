import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import ViewProfile from '../page';
import { useRouter } from 'next/navigation';


it('check if user is logged out', async () => {

    // const { findByTestId } = render(
    //     <ViewProfile params={undefined} />
    // );

    // const profileInfo = await findByTestId('profile-login-prompt');
    // expect(profileInfo).toBeInTheDocument();

});