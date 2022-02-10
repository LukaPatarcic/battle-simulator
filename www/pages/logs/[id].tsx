import type { GetServerSideProps, NextPage } from 'next';
import { Battle, Log } from '@type/api';
import Default from '@layout/Default/Default';
import { getBattleById } from '@api/battles';
import { getLogs } from '@api/logs';
import LogsPage from '@template/LogPage/LogsPage';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LOGIN_ROUTE } from '@constant/routes';
import { getAuthToken } from '@api/auth';

interface Props {
	logs: Log[];
	battle: Battle;
}

const Home: NextPage<Props> = ({ logs, battle }) => {
	const session = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session.status != 'authenticated') {
			router.push(LOGIN_ROUTE);
		}
	}, []);

	if (session.status != 'authenticated') {
		return null;
	}

	return (
		<Default>
			<LogsPage logs={logs} battle={battle} />
		</Default>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const accessToken = await getAuthToken(ctx);
	const id = Number(ctx.query.id);
	const [logs, battle, session] = await Promise.all([
		getLogs(id, accessToken),
		getBattleById(id, accessToken),
		getSession(ctx),
	]);

	return { props: { logs, battle, session } };
};

export default Home;
