import type { GetServerSideProps, NextPage } from 'next';
import { Army, Battle, ErrorMessage, Log } from '@type/api';
import Default from '@layout/Default/Default';
import { getBattleById, startBattle } from '@api/battles';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import GameErrorPage from '@template/GamePage/GameErroPage';
import GamePage from '@template/GamePage/GamePage';
import { getSession, useSession } from 'next-auth/react';
import { getAuthToken } from '@api/auth';

interface Props {
	id: number;
	battle: Battle;
	serverError: ErrorMessage;
}

const StartGame: NextPage<Props> = ({ id, battle, serverError }) => {
	const [error, setError] = useState<ErrorMessage | null>(null);
	const [logs, setLogs] = useState<Log[]>([]);
	const [winner, setWinner] = useState<Army | undefined>(undefined);
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const session = useSession();

	const handleClose = () => setShow(false);

	useEffect(() => {
		if (error || serverError) return;
		setLoading(true);
		const accessToken = session?.data?.accessToken as string;
		startBattle(id, accessToken)
			.then(() => {
				const socket = io(process.env.NEXT_PUBLIC_API_URL || '', {
					reconnectionDelayMax: 10000,
					query: {
						accessToken,
					},
				});
				socket.on('log', (log: Log) => {
					if (log.battle.id === id) setLogs((logs) => [log, ...logs]);
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

	if (error || serverError)
		return <GameErrorPage error={error || serverError} />;

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
	const accessToken = await getAuthToken(ctx);
	const id = Number(ctx.query.id);
	const session = await getSession(ctx);
	try {
		const battle = await getBattleById(id, accessToken);
		return { props: { id, battle, session } };
	} catch (err) {
		return { props: { id, serverError: err, session } };
	}
};

export default StartGame;
