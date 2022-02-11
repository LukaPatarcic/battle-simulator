import type { GetServerSideProps, NextPage } from 'next';
import { Battle } from '@type/api';
import Default from '@layout/Default/Default';
import { getBattleById } from '@api/battles';
import BattlePage from '@template/BattlePage/BattlePage';
import { getAuthToken } from '@api/auth';

interface Props {
	battle: Battle;
}

const Home: NextPage<Props> = ({ battle }) => {
	return (
		<Default>
			<BattlePage battle={battle} />
		</Default>
	);
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const accessToken = await getAuthToken(ctx);
	const id = Number(ctx.query.id);
	const battle = await getBattleById(id, accessToken);

	return { props: { battle } };
};

export default Home;
