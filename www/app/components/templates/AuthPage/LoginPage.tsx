import { FC } from 'react';
import {
	Alert,
	Button,
	Card,
	Col,
	Container,
	Form,
	Row,
} from 'react-bootstrap';
import Link from 'next/link';
import { REGISTER_ROUTE } from '@constant/routes';

interface Props {
	csrfToken: string;
	error: string;
}

const LoginPage: FC<Props> = ({ csrfToken, error }) => {
	return (
		<Container className="mt-5">
			<Row>
				<Col xs={12} md={12} lg={{ span: 8, offset: 2 }}>
					<Card>
						<Card.Header>Login</Card.Header>
						<Card.Body>
							<Form method="post" action="/api/auth/callback/credentials">
								<Form.Group className="mb-3">
									<Form.Label>Username</Form.Label>
									<Form.Control
										required
										name="username"
										type="text"
										placeholder="Username"
									/>
								</Form.Group>
								<input
									name="csrfToken"
									type="hidden"
									defaultValue={csrfToken}
								/>
								<Form.Group className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control
										required
										name="password"
										type="password"
										placeholder="Army units (min 80 max 100)"
									/>
								</Form.Group>
								{error && (
									<Alert className="mt-4" variant="danger">
										{error}
									</Alert>
								)}
								<Row className="d-flex justify-content-center mt-4">
									<Col>
										<Button variant="dark" type="submit">
											Login
										</Button>
										<span className="ms-2">
											Don&apos;t have an account?{' '}
											<Link href={REGISTER_ROUTE}>
												<a>Register</a>
											</Link>
										</span>
									</Col>
								</Row>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default LoginPage;
