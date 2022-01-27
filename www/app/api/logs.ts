import { fetchJson } from './index';
import { Log } from '@type/api';

export const getLogs = (battleId: number): Promise<Log[]> =>
  fetchJson(`/logs?battleId=${battleId}`);
