import { FC } from 'react';
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
import { Message } from '@type/index';
import ErrorMessage from '@element/ErrorMessage/ErrorMessage';
import LoadingButton from '@element/LoadingButton/LoadingButton';

interface Props {
	loading: boolean;
	message: Message;
	getFieldProps: (title: string) => any;
	getFormProps: () => void;
	errors: { [key: string]: string };
}

const BattlePage: FC<Props> = ({
	loading,
	message,
	getFieldProps,
	getFormProps,
	errors,
}) => (
	<Container className="mt-5">
		<Row>
			<Col xs={12} md={12} lg={{ span: 8, offset: 2 }}>
				<Card>
					<Card.Header>Create a Battle</Card.Header>
					<Card.Body>
						<Form {...getFormProps()}>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Battle title</Form.Label>
								<Form.Control
									{...getFieldProps('title')}
									type="text"
									isInvalid={!!errors.title}
									placeholder="Battle title (ex Lorem ipsum)"
								/>
								<ErrorMessage error={errors.title} />
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

export default BattlePage;
