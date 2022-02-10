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
import { signOut } from 'next-auth/react';

const pages = [
	{ name: 'Battles', route: BATTLES_ROUTE },
	{ name: 'Add Battle', route: CREATE_BATTLE_ROUTE },
	{ name: 'Add Army', route: CREATE_ARMY_ROUTE },
];

function Header() {
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand>
					<Link href={HOME_ROUTE}>
						<a href={HOME_ROUTE} className="text-white text-decoration-none">
							{APP_NAME}
						</a>
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					{pages.map((page) => (
						<Nav.Item key={page.name} className="mx-2">
							<Link href={page.route}>
								<a
									href={page.route}
									className="text-white text-decoration-none"
								>
									{page.name}
								</a>
							</Link>
						</Nav.Item>
					))}
					<Nav.Item key="signout" className="mx-2 ms-auto text-white">
						<div className="cursor-pointer" onClick={() => signOut()}>
							Sign out
						</div>
					</Nav.Item>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
export default Header;
