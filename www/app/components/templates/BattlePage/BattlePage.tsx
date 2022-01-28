import { FC } from 'react';
import { Battle } from '@type/api';
import { Card, Col, Container, Row } from 'react-bootstrap';
import jsAgo from 'js-ago';
import Link from 'next/link';
import { LOGS_ROUTE } from '@constant/routes';

interface Props {
	battle: Battle;
}

const BattlePage: FC<Props> = ({ battle }) => (
	<Container className="mt-5">
		<Row>
			<Col>
				<Card>
					<Card.Header>{battle.title} Info</Card.Header>
					<Card.Body>
						<h4>
							Title:
							{battle.title}
						</h4>
						<h4>
							Army no.
							{battle.armies.length}
						</h4>
						<h4>
							Created
							{jsAgo(new Date(battle.createdAt))}
						</h4>
						<h4>Armies: </h4>
						<div>
							{battle.armies.map((army) => (
								<div key={army.id}>
									<span className="fw-bold">{army.name}</span> -{' '}
									{army.initialUnits} units
								</div>
							))}
						</div>
					</Card.Body>
					<Card.Footer>
						<Link href={LOGS_ROUTE(battle.id)}>
							<a href={LOGS_ROUTE(battle.id)} className="btn btn-dark">
								See Logs
							</a>
						</Link>
					</Card.Footer>
				</Card>
			</Col>
		</Row>
	</Container>
);

export default BattlePage;
