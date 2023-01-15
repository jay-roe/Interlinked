import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    
    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Interlinked</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link href="demo">Demo</Nav.Link>
                        { currentUser ?
                            <Button onClick={e => logout(e)}>Logout</Button> :
                            <>
                                <Nav.Link href="login">Login</Nav.Link>
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