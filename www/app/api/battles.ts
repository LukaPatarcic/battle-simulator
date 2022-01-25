import {fetchJson} from "./index";
import {Battle} from "../types/api";

export const getBattles = (): Promise<Battle[]> =>
    fetchJson('/battles');

export const getBattleById = (id: number): Promise<Battle> =>
    fetchJson(`/battles/${id}`)

export const createBattle = (battle: any): Promise<Battle> =>
    fetchJson('/battles', {
        body: JSON.stringify(battle),
        method: 'POST'
    });
