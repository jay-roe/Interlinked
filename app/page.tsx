'use client';

import { Inter } from '@next/font/google'
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { HeroDescription, HomeDiv, Title } from "./page.styles";
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
        <HomeDiv>
            <Title data-testid="home-brand">Interlinked</Title>
            {/* Here goes the app's components */}
            {
                currentUser ? 
                <HeroDescription data-testid="welcome-msg">Welcome, {currentUser.name || currentUser.email}. Let's get you interlinked.</HeroDescription> : 
                <HeroDescription data-testid="base-msg">We will become interlinked.</HeroDescription>
            }
            <Alert variant='danger' show={isDeletedAlertShow}>
                Successfully deleted your account.
            </Alert>
        </HomeDiv>
    );
}

export default Home;

