import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export default function NavbarMenu() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">McKing</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/rendeles">Rendelés</Nav.Link>
            <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
          </Nav>
          <Nav>
              <Button variant="outline-danger">Kijelentkezés</Button>
              <Button as={Link} to="/login" variant="outline-success">Bejelentkezés</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}