'use client';

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

const NavBar = () => {
    const { currentUser, logout } = useAuth();
    
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Interlinked</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav>
                        {
                            // Logged in user sees profile and logout buttons
                            // Logged out user sees Login and Register buttons
                            currentUser ?
                            <>
                                <Nav.Link href="profile">Profile</Nav.Link>
                                <Button data-testid="nav-logout" onClick={() => logout()}>Logout</Button> 
                            </>
                            :
                            <>
                                <Nav.Link data-testid="nav-login" href="login">Login</Nav.Link>
                                <Nav.Link href="register">Register</Nav.Link> 
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default NavBar;