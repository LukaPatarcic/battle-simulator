import { Army } from '@type/api';
import { fetchJson } from './index';

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
