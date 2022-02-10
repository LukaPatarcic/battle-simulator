import type { GetServerSideProps, NextPage } from 'next';
import HomePage from '@template/HomePage/HomePage';
import Default from '@layout/Default/Default';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { LOGIN_ROUTE } from '@constant/routes';
import { useEffect } from 'react';

const Home: NextPage = () => {
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
			<HomePage />
		</Default>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	return {
		props: {
			session,
		},
	};
};

export default Home;
