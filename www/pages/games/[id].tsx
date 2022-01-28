import type { GetServerSideProps, NextPage } from 'next';
import {
	Army, Battle, ErrorMessage, Log,
} from '@type/api';
import Default from '@layout/Default/Default';
import { getBattleById, startBattle } from '@api/battles';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import GameErrorPage from '@template/GamePage/GameErroPage';
import GamePage from '@template/GamePage/GamePage';

interface Props {
  id: number;
  battle: Battle;
}

const StartGame: NextPage<Props> = ({ id, battle }) => {
	const [error, setError] = useState<ErrorMessage | null>(null);
	const [logs, setLogs] = useState<Log[]>([]);
	const [winner, setWinner] = useState<Army | undefined>(undefined);
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);

	useEffect(() => {
		setLoading(true);
		startBattle(id)
			.then(() => {
				const socket = io(process.env.NEXT_PUBLIC_API_URL || '', {
					reconnectionDelayMax: 10000,
				});
				socket.on('log', (log: Log) => {
					if (log.battle.id === id) setLogs(logs => [log, ...logs]);
				});
				socket.on('winner', (winner: Army) => {
					if (winner.battle.id === id) {
						setWinner(winner);
						setShow(true);
					}
				});
			})
			.catch((error) => {
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	if (error) return <GameErrorPage error={error} />;
	return (
		<Default>
			<GamePage
				logs={logs}
				battle={battle}
				winner={winner}
				loading={loading}
				show={show}
				handleClose={handleClose}
			/>
		</Default>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const id = Number(ctx.query.id);
	const battle = await getBattleById(id);
	return { props: { id, battle } };
};

export default StartGame;
