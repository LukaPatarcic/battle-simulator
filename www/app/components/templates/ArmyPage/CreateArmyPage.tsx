import { FC, useState } from 'react';
import useForm from '@hook/useForm';
import { createBattle } from 'api/battles';
import { Input } from 'postcss';
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
import { createArmy } from '@api/armies';
import { armyAttackStrategy } from '@module/Army/army-attack-strategy';

interface Props {
  battles: Battle[];
}

const CreateArmyPage: FC<Props> = ({ battles }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message>({
    message: '',
    type: 'success',
  });
  const { getFieldProps, getFormProps, isFormValid, errors } = useForm({
    fields: {
      name: {
        isRequired: 'Please enter a title',
        isMaxLength: {
          message: 'Max length is 100 characters',
          length: 100,
        },
      },
      units: {
        isRequired: 'Please enter number of units',
        isNumber: 'Please enter a number',
        isGreaterThan: {
          message: 'Please enter a value greater than or equal to 80',
          value: 79,
        },
        isLessThan: {
          message: 'Please enter a value less than or equal to 100',
          value: 101,
        },
      },
      attackStrategy: {
        isRequired: 'Please select an attack strategy',
      },
      battleId: {
        isRequired: 'Please select a battle',
      },
    },
    onSubmit: async (context: {
      values: {
        name: string;
        units: string;
        attackStrategy: string;
        battleId: string;
      };
      isFormValid: boolean;
    }) => {
      if (context.isFormValid) {
        const { name, units, attackStrategy, battleId } = context?.values || {};

        setLoading(true);
        createArmy({
          name,
          units: parseInt(units),
          attackStrategy,
          battleId: parseInt(battleId),
        })
          .then(() => {
            setMessage({
              message: 'Successfully created a battle',
              type: 'success',
            });
          })
          .catch(() => {
            setMessage({
              message: 'Something went wrong while creating your battle',
              type: 'danger',
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    showErrors: 'blur',
  });

  return (
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
                    isInvalid={errors.title}
                    placeholder="Army name (ex Lorem ipsum)"
                  />
                  {errors.title && (
                    <Form.Text className="text-danger">
                      {errors.title}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Army title</Form.Label>
                  <Form.Control
                    {...getFieldProps('units')}
                    type="number"
                    isInvalid={errors.units}
                    placeholder="Army units (min 80 max 100)"
                  />
                  {errors.units && (
                    <Form.Text className="text-danger">
                      {errors.units}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Battle Select</Form.Label>
                  <Form.Select
                    isInvalid={errors.battle}
                    {...getFieldProps('battleId')}
                  >
                    <option>Select a battle</option>
                    {battles.map((battle) => (
                      <option key={battle.id} value={battle.id}>
                        {battle.title}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.battleId && (
                    <Form.Text className="text-danger">
                      {errors.battleId}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Army Attack Strategy</Form.Label>
                  <Form.Select
                    isInvalid={errors.attackStrategy}
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
                  {errors.attackStrategy && (
                    <Form.Text className="text-danger">
                      {errors.attackStrategy}
                    </Form.Text>
                  )}
                </Form.Group>
                {message.message && (
                  <Alert className="mt-4" variant={message.type}>
                    {message.message}
                  </Alert>
                )}
                <Button className="mt-4" variant="dark" type="submit">
                  {loading ? (
                    <Spinner size="sm" animation="border" />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateArmyPage;
