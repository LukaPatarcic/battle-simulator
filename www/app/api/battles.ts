import { Battle } from '@type/api';
import { fetchJson } from './index';

export const getBattles = (accessToken: string): Promise<Battle[]> =>
	fetchJson('/battles', {}, accessToken);

export const getBattleById = (
	id: number,
	accessToken: string,
): Promise<Battle> => fetchJson(`/battles/${id}`, {}, accessToken);

export const createBattle = (
	battle: any,
	accessToken: string,
): Promise<Battle> =>
	fetchJson(
		'/battles',
		{
			body: JSON.stringify(battle),
			method: 'POST',
		},
		accessToken,
	);

export const startBattle = (id: number, accessToken: string): Promise<Battle> =>
	fetchJson(`/battles/start/${id}`, {}, accessToken);

export const restartBattle = (id: number, accessToken: string): Promise<any> =>
	fetchJson(`/battles/restart/${id}`, {}, accessToken);
