import { Button, Image } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import VerifiedIcon from '../../components/VerifiedIcon/VerifiedIcon';
import type { MouseEvent } from 'react';

export default function Profile() {
    const { currentUser, login, register } = useAuth();

    const handleDeleteAccount = (e: MouseEvent) => {

    }

    // User not logged in
    if (!currentUser) {
        return (
            <>
                <h1>Your Profile</h1>
                <h2>You must be logged in to edit your profile.</h2>
                <Button href='login'>Login</Button>
                <Button href='register'>Register</Button>
            </>
        )
    }

    return (
        <>
            <h1>{currentUser.displayName ? currentUser.displayName : 'No display name provided.'}</h1>
            <Image src={currentUser.photoURL} />
            <h2>Email: {currentUser.email} <VerifiedIcon verified={currentUser.emailVerified} showText /></h2>
            <h2>Phone number {currentUser.phoneNumber ? `: ${currentUser.phoneNumber}` : 'not provided.'}</h2>
            <Button variant='danger' onClick={e => handleDeleteAccount(e)}>Delete account</Button>
        </>
    )
}
