export interface Battle {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    armies: Army[];

}

export interface Army {
    id: number;
    name: string;
    units: number;
    attackStrategy: AttackStrategy
    battle: Battle;
}

export enum AttackStrategy {
    RANDOM = 'RANDOM',
    WEAKEST = 'WEAKEST',
    STRONGEST = 'STRONGEST',
}

