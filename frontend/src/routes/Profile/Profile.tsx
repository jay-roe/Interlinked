import { Button, Image } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import VerifiedIcon from '../../components/VerifiedIcon/VerifiedIcon';
import { useState } from 'react';
import DeleteAccountPopup from '../../components/DeleteAccountPopup/DeleteAccountPopup';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate()

    const { currentUser, authUser, deleteAccount } = useAuth();

    const [name, setName] = useState(currentUser?.name);
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
    if (!currentUser || !authUser) {
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
            <h1>{name || 'No name provided.'}</h1>
            <Image src={currentUser.profilePicture} />
            <h2>Email: {currentUser.email} <VerifiedIcon verified={authUser.emailVerified} showText /></h2>
            {/* <h2>About</h2>
            <p>{currentUser.bio}</p>
            <input
                id="edit-name"
                name="name"
                type="text"
                onChange={e => setName(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Name"
            /> */}

            <Button variant='danger' onClick={() => setIsModalShow(true)}>Delete account</Button>
            <DeleteAccountPopup show={isModalShow} onHide={() => setIsModalShow(false)} onDeleteAccount={onDeleteAccount} />
        </>
    )
}
