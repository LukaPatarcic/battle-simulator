import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProviders from 'next-auth/providers/credentials';
import { signIn } from '@api/auth';

const options: NextAuthOptions = {
	pages: {
		signIn: '/login',
	},
	secret: process.env.SECRET,
	jwt: {
		secret: process.env.SECRET,
	},
	callbacks: {
		session: ({ session, token, user }) => {
			session.accessToken = token.accessToken;
			session.user = token.username;
			session.id = token.id;
			return session;
		},
		jwt: async ({ token, user, account, isNewUser }) => {
			if (user) {
				token = { ...user };
			}
			return token;
		},
	},
	providers: [
		CredentialsProviders({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Email and Password',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' },
			},
			authorize: async (credentials) => {
				try {
					const user = await signIn(credentials);
					return Promise.resolve(user);
				} catch (err) {
					return Promise.resolve(null);
				}
			},
		}),
	],
};

export default (req, res) => NextAuth(req, res, options);
