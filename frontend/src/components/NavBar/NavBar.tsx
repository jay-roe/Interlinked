import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Interlinked</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link href="demo">Demo</Nav.Link>
                        <Nav.Link href="login">Login</Nav.Link>
                        <Nav.Link href="register">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default NavBar;