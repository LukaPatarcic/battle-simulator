import { Button, Spinner } from 'react-bootstrap';
import { FC } from 'react';

interface Props {
	loading: boolean;
}

const LoadingButton: FC<Props> = ({ loading }) => {
	return (
		<Button variant="dark" type="submit">
			{loading ? <Spinner size="sm" animation="border" /> : 'Submit'}
		</Button>
	);
};

export default LoadingButton;
