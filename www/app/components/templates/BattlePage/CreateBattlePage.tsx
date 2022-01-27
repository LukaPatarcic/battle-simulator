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

const BattlePage: FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message>({
    message: '',
    type: 'success',
  });
  const { getFieldProps, getFormProps, isFormValid, errors } = useForm({
    fields: {
      title: {
        isRequired: 'Please enter a title',
        isMaxLength: {
          message: 'Max length is 100 characters',
          length: 100,
        },
      },
    },
    onSubmit: async (context: {
      values: { title: string };
      isFormValid: boolean;
    }) => {
      if (context.isFormValid) {
        const { title } = context?.values || {};

        setLoading(true);
        createBattle({ title })
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
            <Card.Header>Create a Battle</Card.Header>
            <Card.Body>
              <Form {...getFormProps()}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Battle title</Form.Label>
                  <Form.Control
                    {...getFieldProps('title')}
                    type="text"
                    isInvalid={errors.title}
                    placeholder="Battle title (ex Lorem ipsum)"
                  />
                  {errors.title && (
                    <Form.Text className="text-danger">
                      {errors.title}
                    </Form.Text>
                  )}
                </Form.Group>
                {message.message && (
                  <Alert variant={message.type}>{message.message}</Alert>
                )}
                <Button variant="dark" type="submit">
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

export default BattlePage;
