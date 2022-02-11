import {
	Alert,
	Button,
	Card,
	Col,
	Container,
	Form,
	Row,
	Spinner,
} from 'react-bootstrap';
import ErrorMessage from '@element/ErrorMessage/ErrorMessage';
import LoadingButton from '@element/LoadingButton/LoadingButton';

const RegisterPage = ({
	getFormProps,
	getFieldProps,
	errors,
	message,
	loading,
}) => {
	return (
		<Container className="mt-5">
			<Row>
				<Col md={12} lg={{ offset: 2, span: 8 }}>
					<Card>
						<Card.Header>Register</Card.Header>
						<Card.Body>
							<Form {...getFormProps()}>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Username</Form.Label>
									<Form.Control
										{...getFieldProps('username')}
										type="text"
										isInvalid={errors.username}
										placeholder="Username"
									/>
									<ErrorMessage error={errors.username} />
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Password</Form.Label>
									<Form.Control
										{...getFieldProps('password')}
										type="password"
										isInvalid={errors.password}
										placeholder="Password"
									/>
									<ErrorMessage error={errors.password} />
								</Form.Group>
								{message.message && (
									<Alert variant={message.type}>{message.message}</Alert>
								)}
								<LoadingButton loading={loading} />
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default RegisterPage;
