import Default from '@layout/Default/Default';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import { BATTLES_ROUTE } from '@constant/routes';
import React, { FC } from 'react';
import { ErrorMessage } from '@type/api';

interface Props {
	error: ErrorMessage;
}

const GameErrorPage: FC<Props> = ({ error }) => (
	<Default>
		<Container className="mt-5">
			<Row>
				<Col xs={12}>
					<p className="text-center h3">
						There was an error while trying to start your game:
					</p>
					<p className="text-danger text-center fw-bold h2 mb-4">
						{error.message}
					</p>
				</Col>
				<Col xs={12} className="d-flex justify-content-center">
					<Button variant="dark" size="lg">
						<Link href={BATTLES_ROUTE}>
							<a
								href={BATTLES_ROUTE}
								className="text-white text-decoration-none"
							>
								Go Back
							</a>
						</Link>
					</Button>
				</Col>
			</Row>
		</Container>
	</Default>
);

export default GameErrorPage;
