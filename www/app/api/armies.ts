import { Army } from '@type/api';
import { fetchJson } from './index';

export const createArmy = (army: any): Promise<Army> => fetchJson('/armies', {
	body: JSON.stringify(army),
	method: 'POST',
});
