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
import { Battle } from '@type/api';
import { armyAttackStrategy } from '@module/Army/army-attack-strategy';
import ErrorMessage from '@element/ErrorMessage/ErrorMessage';
import LoadingButton from '@element/LoadingButton/LoadingButton';

interface Props {
	battles: Battle[];
	loading: boolean;
	message: Message;
	getFieldProps: (title: string) => unknown;
	getFormProps: () => void;
	errors: { [key: string]: string };
}

const CreateArmyPage: FC<Props> = ({
	battles,
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
					<Card.Header>Create an Army</Card.Header>
					<Card.Body>
						<Form {...getFormProps()}>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Army name</Form.Label>
								<Form.Control
									{...getFieldProps('name')}
									type="text"
									isInvalid={!!errors.name}
									placeholder="Army name (ex Lorem ipsum)"
								/>
								<ErrorMessage error={errors.name} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Army title</Form.Label>
								<Form.Control
									{...getFieldProps('units')}
									type="number"
									isInvalid={!!errors.units}
									placeholder="Army units (min 80 max 100)"
								/>
								<ErrorMessage error={errors.units} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Battle Select</Form.Label>
								<Form.Select
									isInvalid={!!errors.battleId}
									{...getFieldProps('battleId')}
								>
									<option>Select a battle</option>
									{battles.map((battle) => (
										<option key={battle.id} value={battle.id}>
											{battle.title}
										</option>
									))}
								</Form.Select>
								<ErrorMessage error={errors.battleId} />
							</Form.Group>
							<Form.Group className="my-3">
								<Form.Label>Army Attack Strategy</Form.Label>
								<Form.Select
									isInvalid={!!errors.attackStrategy}
									{...getFieldProps('attackStrategy')}
								>
									<option>Select an Attack Strategy</option>
									<option value={armyAttackStrategy.RANDOM}>
										{armyAttackStrategy.RANDOM}
									</option>
									<option value={armyAttackStrategy.WEAKEST}>
										{armyAttackStrategy.WEAKEST}
									</option>
									<option value={armyAttackStrategy.STRONGEST}>
										{armyAttackStrategy.STRONGEST}
									</option>
								</Form.Select>
								<ErrorMessage error={errors.attackStrategy} />
							</Form.Group>
							{message.message && (
								<Alert className="mt-4" variant={message.type}>
									{message.message}
								</Alert>
							)}
							<LoadingButton loading={loading} />
						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	</Container>
);

export default CreateArmyPage;
