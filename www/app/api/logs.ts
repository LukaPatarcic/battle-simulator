import { Log } from '@type/api';
import { fetchJson } from './index';

export const getLogs = (battleId: number): Promise<Log[]> => fetchJson(`/logs?battleId=${battleId}`);
