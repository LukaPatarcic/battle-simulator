import type { GetServerSideProps, NextPage } from 'next';
import { Battle } from '@type/api';
import Default from '@layout/Default/Default';
import { getBattleById } from '@api/battles';
import BattlePage from '@template/BattlePage/BattlePage';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LOGIN_ROUTE } from '@constant/routes';
import { getAuthToken } from '@api/auth';

interface Props {
	battle: Battle;
}

const Home: NextPage<Props> = ({ battle }) => {
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
			<BattlePage battle={battle} />
		</Default>
	);
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const accessToken = await getAuthToken(ctx);
	const id = Number(ctx.query.id);
	const [battle, session] = await Promise.all([
		getBattleById(id, accessToken),
		getSession(ctx),
	]);

	return { props: { battle, session } };
};

export default Home;
