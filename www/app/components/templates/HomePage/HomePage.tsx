import { FC } from 'react';
import { Container } from 'react-bootstrap';
import { BATTLES_ROUTE, CREATE_BATTLE_ROUTE } from '@constant/routes';
import Link from 'next/link';

const HomePage: FC = () => (
	<Container>
		<div className="jumbotron mt-5">
			<h1 className="display-4">Welcome to Battle Simulator</h1>
			<p className="lead">Let&apos;s get started by creating a new battle</p>
			<hr className="my-4" />
			<Link href={CREATE_BATTLE_ROUTE}>
				<a href={CREATE_BATTLE_ROUTE} className="btn bnt-dark btn-lg me-3">
					Create Battle
				</a>
			</Link>
			<Link href={BATTLES_ROUTE}>
				<a href={BATTLES_ROUTE} className="btn btn-outline-dark btn-lg">
					View Battles
				</a>
			</Link>
		</div>
	</Container>
);

export default HomePage;
