import { Army } from '@type/api';
import { fetchJson } from './index';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest } from 'next';

export const signIn = (credentials) =>
	fetchJson('/auth/signin', {
		body: JSON.stringify(credentials),
		method: 'POST',
	});

export const signUp = (credentials) =>
	fetchJson('/auth/signup', {
		body: JSON.stringify(credentials),
		method: 'POST',
	});

export const getAuthToken = async (ctx) => {
	const data = await getToken({
		req: ctx.req as NextApiRequest,
		secret: process.env.SECRET,
	});
	const { accessToken } = data as any;

	return accessToken;
};
