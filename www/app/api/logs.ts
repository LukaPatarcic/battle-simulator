import {fetchJson} from "./index";
import {Log} from "../types/api";

export const getLogs = (battleId: number): Promise<Log[]> =>
    fetchJson(`/logs?battleId=${battleId}`);
