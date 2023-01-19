import { Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import VerifiedIcon from '../../components/VerifiedIcon/VerifiedIcon';
import { useState } from 'react';
import DeleteAccountPopup from '../../components/DeleteAccountPopup/DeleteAccountPopup';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate()

    const { currentUser, deleteAccount } = useAuth();
    const [isModalShow, setIsModalShow] = useState(false);

    async function onDeleteAccount() {
        try {
            await deleteAccount();

            // Redirect to home page, with state saying account was just deleted
            navigate('/', { state: { deletedAccount: true } });
            setIsModalShow(false);
        } catch(err) {
            console.error(err);
            return false;
        }
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

    // User logged in
    return (
        <>
            <h1>{currentUser.displayName ? currentUser.displayName : 'No display name provided.'}</h1>
            {/* 
                // TODO (Optional): Update user profile with OAuth provider profile picture by default
                <Image src={currentUser.photoURL} />   
            */}
            <h2>Email: {currentUser.email} <VerifiedIcon verified={currentUser.emailVerified} showText /></h2>
            <h2>Phone number {currentUser.phoneNumber ? `: ${currentUser.phoneNumber}` : 'not provided.'}</h2>
            <Button variant='danger' onClick={() => setIsModalShow(true)}>Delete account</Button>
            <DeleteAccountPopup show={isModalShow} onHide={() => setIsModalShow(false)} onDeleteAccount={onDeleteAccount} />
        </>
    )
}
