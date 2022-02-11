import type { GetServerSideProps, NextPage } from 'next';
import { Battle, Log } from '@type/api';
import Default from '@layout/Default/Default';
import { getBattleById } from '@api/battles';
import { getLogs } from '@api/logs';
import LogsPage from '@template/LogPage/LogsPage';
import { getAuthToken } from '@api/auth';

interface Props {
	logs: Log[];
	battle: Battle;
}

const Home: NextPage<Props> = ({ logs, battle }) => {
	return (
		<Default>
			<LogsPage logs={logs} battle={battle} />
		</Default>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const accessToken = await getAuthToken(ctx);
	const id = Number(ctx.query.id);
	const [logs, battle] = await Promise.all([
		getLogs(id, accessToken),
		getBattleById(id, accessToken),
	]);

	return { props: { logs, battle } };
};

export default Home;
