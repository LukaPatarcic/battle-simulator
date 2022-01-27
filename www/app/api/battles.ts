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

export const startBattle = (id: number): Promise<Battle> =>
    fetchJson(`/battles/start/${id}`)

export const restartBattle = (id: number): Promise<any> =>
    fetchJson(`/battles/restart/${id}`)
