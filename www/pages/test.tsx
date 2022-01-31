import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { getToken } from 'next-auth/jwt';

export default function Component() {
	const { data: session } = useSession();
	if (session) {
		return (
			<>
				Signed in as {session.user} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	);
}
