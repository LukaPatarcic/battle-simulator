import { Army } from '@type/api';
import { fetchJson } from './index';

export const createArmy = (army: any, accessToken: string): Promise<Army> =>
	fetchJson(
		'/armies',
		{
			body: JSON.stringify(army),
			method: 'POST',
		},
		accessToken,
	);
