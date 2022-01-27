import * as React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { APP_NAME } from '@constant/index';
import {
  BATTLES_ROUTE,
  CREATE_ARMY_ROUTE,
  CREATE_BATTLE_ROUTE,
  HOME_ROUTE,
} from '@constant/routes';
import Link from 'next/link';

const pages = [
  { name: 'Battles', route: BATTLES_ROUTE },
  { name: 'Add Battle', route: CREATE_BATTLE_ROUTE },
  { name: 'Add Army', route: CREATE_ARMY_ROUTE },
];

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link href={HOME_ROUTE}>
            <a className="text-white text-decoration-none">{APP_NAME}</a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {pages.map((page) => (
              <Nav.Item key={page.name} className="mx-2">
                <Link href={page.route}>
                  <a className="text-white text-decoration-none">{page.name}</a>
                </Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
