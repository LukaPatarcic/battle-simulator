import * as React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { APP_NAME } from '@constant/index';
import { BATTLES_ROUTE, HOME_ROUTE } from '@constant/routes';

const pages = [{ name: 'Battles', route: BATTLES_ROUTE }];

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href={HOME_ROUTE}>{APP_NAME}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {pages.map((page) => (
              <Nav.Link key={page.name} href={page.route}>
                {page.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
