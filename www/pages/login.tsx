import { getCsrfToken } from 'next-auth/react';
import { GetServerSideProps, NextPage } from 'next';
import Default from '@layout/Default/Default';
import LoginPage from '@template/AuthPage/LoginPage';

interface Props {
	csrfToken: string;
	error: string;
}

const SignIn: NextPage<Props> = ({ csrfToken, error }) => {
	return (
		<Default>
			<LoginPage csrfToken={csrfToken} error={error} />
		</Default>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			csrfToken: await getCsrfToken(context),
			error: context.query.error || '',
		},
	};
};

export default SignIn;
