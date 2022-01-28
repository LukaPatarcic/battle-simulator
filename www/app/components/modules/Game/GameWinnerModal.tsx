import { Button, Modal } from 'react-bootstrap';
import React, { FC } from 'react';
import { Army } from '@type/api';

interface Props {
	show: boolean;
	winner?: Army;
	handleClose: () => void;
}

const GameWinnerModal: FC<Props> = ({ show, winner, handleClose }) => (
	<Modal show={show} onHide={handleClose}>
		<Modal.Header closeButton>
			<Modal.Title>We have a winner</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			Congratulations, <span className="fw-bold">{winner?.name}</span> on you
			victory
		</Modal.Body>
		<Modal.Footer>
			<Button variant="secondary" onClick={handleClose}>
				Close
			</Button>
		</Modal.Footer>
	</Modal>
);

GameWinnerModal.defaultProps = {
	winner: null,
};

export default GameWinnerModal;
