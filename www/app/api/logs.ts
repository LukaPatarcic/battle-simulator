import { Log } from '@type/api';
import { fetchJson } from './index';

export const getLogs = (
	battleId: number,
	accessToken: string,
): Promise<Log[]> => fetchJson(`/logs?battleId=${battleId}`, {}, accessToken);
