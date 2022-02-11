import * as React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { APP_NAME } from '@constant/index';
import {
	BATTLES_ROUTE,
	CREATE_ARMY_ROUTE,
	CREATE_BATTLE_ROUTE,
	HOME_ROUTE,
	LOGIN_ROUTE,
} from '@constant/routes';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const pages = [
	{ name: 'Battles', route: BATTLES_ROUTE },
	{ name: 'Add Battle', route: CREATE_BATTLE_ROUTE },
	{ name: 'Add Army', route: CREATE_ARMY_ROUTE },
];

function Header() {
	const session = useSession();
	const router = useRouter();
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
					<Nav.Item
						key="signout"
						className="mx-2 mx-xs-2 mx-sm-2 mx-md-2 ms-lg-auto text-white"
					>
						<div
							role="button"
							onClick={() =>
								session.data ? signOut() : router.push(LOGIN_ROUTE)
							}
						>
							{session.data ? 'Sign out' : 'Login'}
						</div>
					</Nav.Item>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
export default Header;
