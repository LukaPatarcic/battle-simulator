export interface Battle {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  status: BattleStatus;
  armies: Army[];
}

export interface Army {
  id: number;
  name: string;
  units: number;
  initialUnits: number;
  attackStrategy: AttackStrategy;
  battle: Battle;
}

export interface Log {
  id: number;
  attacker: string;
  target: string;
  damage: number;
  createdAt: Date;
  updatedAt: Date;
  battle: Battle;
}

export interface ErrorMessage {
  message: string;
}

export enum AttackStrategy {
  RANDOM = 'RANDOM',
  WEAKEST = 'WEAKEST',
  STRONGEST = 'STRONGEST',
}

export enum BattleStatus {
  IDLE = 'IDLE',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
