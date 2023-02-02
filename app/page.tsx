'use client';

import { Inter } from '@next/font/google'
// import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
    const { currentUser } = useAuth();
    // const location = useLocation();
    const ALERT_TIMEOUT = 5000; // Deleted alert timeout in milliseconds
    const [isDeletedAlertShow, setIsDeletedAlertShow] = useState(false);

    // TODO reintroduce deleted account alert
    /*useEffect(() => {
        if (location.state?.deletedAccount) {
            setIsDeletedAlertShow(true);
            setTimeout(async () => {
                setIsDeletedAlertShow(false);
            }, ALERT_TIMEOUT);
            location.state.deletedAccount = false;
        }
    }, [location.state])*/
    
    return (
        <div className='container text-white mx-auto'>
            <h1 className='text-center font-extrabold text-7xl mb-3' data-testid="home-brand">Interlinked</h1>
            {/* Here goes the app's components */}
            {
                currentUser ? 
                <p data-testid="welcome-msg" className='text-center text-2xl'>Welcome, {currentUser.name || currentUser.email}. Let&apos;s get you interlinked.</p>: 
                <p data-testid="base-msg" className='text-center text-2xl'>We will become interlinked.</p>
            }
            {/* <Alert variant='danger' show={isDeletedAlertShow}>
                Successfully deleted your account.
            </Alert> */}
        </div>
    );
}

export default Home;

