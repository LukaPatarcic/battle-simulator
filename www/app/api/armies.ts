import {fetchJson} from "./index";
import {Army} from "../types/api";

export const createArmy = (army: any): Promise<Army> =>
    fetchJson('/armies', {
        body: JSON.stringify(army),
        method: 'POST'
    });
