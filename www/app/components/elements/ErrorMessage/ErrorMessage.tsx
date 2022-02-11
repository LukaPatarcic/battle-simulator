import { Form } from 'react-bootstrap';
import { FC } from 'react';

interface Props {
	error: string;
}

const ErrorMessage: FC<Props> = ({ error }) => {
	if (!error) return null;
	return <Form.Text className="text-danger">{error}</Form.Text>;
};

export default ErrorMessage;
