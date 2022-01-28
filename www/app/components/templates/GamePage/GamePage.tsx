import { Col, Container, Row } from 'react-bootstrap';
import React, { FC } from 'react';
import { Army, Battle, Log } from '@type/api';
import GameTable from '@module/Game/GameTable';
import GameWinnerModal from '@module/Game/GameWinnerModal';

interface Props {
	logs: Log[];
	battle: Battle;
	winner?: Army;
	loading: boolean;
	show: boolean;
	handleClose: () => void;
}

const GamePage: FC<Props> = ({
	logs,
	battle,
	winner,
	loading,
	show,
	handleClose,
}) => {
	if (loading) {
		return <p>Loading...</p>;
	}
	return (
		<Container>
			<Row>
				<Col xs={12}>
					<h1>
						Battle Logs - {battle.title} ({battle.armies.length} - armies)
					</h1>
				</Col>
				<Col>
					<GameTable logs={logs} />
				</Col>
				<GameWinnerModal
					show={show}
					winner={winner}
					handleClose={handleClose}
				/>
			</Row>
		</Container>
	);
};

GamePage.defaultProps = {
	winner: null,
};

export default GamePage;
