import type { GetServerSideProps, NextApiRequest, NextPage } from 'next';
import Default from '@layout/Default/Default';
import BattlesPage from '@template/BattlePage/BattlesPage';
import { getBattles } from '@api/battles';
import { Battle } from '@type/api';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LOGIN_ROUTE } from '@constant/routes';
import { getAuthToken } from '@api/auth';
import { getToken } from 'next-auth/jwt';

interface Props {
	battles: Battle[];
}

const Battles: NextPage<Props> = ({ battles }) => {
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
			<BattlesPage rows={battles} />
		</Default>
	);
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
	try {
		const accessToken = await getAuthToken(ctx);
		const [battles, session] = await Promise.all([
			getBattles(accessToken),
			getSession(ctx),
		]);
		return { props: { battles, session } };
	} catch (err) {
		return { props: {}, redirect: LOGIN_ROUTE };
	}
};

export default Battles;
