import { Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { HeroDescription, HomeDiv, Title } from "./Home.styles";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
    const { currentUser } = useAuth();
    const location = useLocation();
    const ALERT_TIMEOUT = 5000; // Deleted alert timeout in milliseconds
    const [isDeletedAlertShow, setIsDeletedAlertShow] = useState(false);

    useEffect(() => {
        if (location.state?.deletedAccount) {
            setIsDeletedAlertShow(true);
            setTimeout(async () => {
                setIsDeletedAlertShow(false);
            }, ALERT_TIMEOUT);
            location.state.deletedAccount = false;
        }
    }, [location.state])
    
    return (
        <HomeDiv>
            <Title data-testid="home-brand">Interlinked</Title>
            {/* Here goes the app's components */}
            {
                currentUser ? 
                <HeroDescription>Welcome, {currentUser.displayName ? currentUser.displayName : currentUser.email}. Let's get you interlinked.</HeroDescription>: 
                <HeroDescription>We will become interlinked.</HeroDescription>
            }
            <Alert variant='danger' show={isDeletedAlertShow}>
                Successfully deleted your account. You screwed up.🌚
            </Alert>
        </HomeDiv>
    );
}

export default Home;
