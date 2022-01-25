import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Battle } from '../battle/battle.entity';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { AttackStrategy } from './army-attack-strategy.enum';

@Entity()
export class Army extends BaseEntity {
  constructor(
    name: string,
    units: number,
    attackStrategy: AttackStrategy,
    battle: Battle,
  ) {
    super();
    this.name = name;
    this.units = units;
    this.attackStrategy = attackStrategy;
    this.battle = battle;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Min(80)
  @Max(100)
  units: number;

  @IsNotEmpty()
  attackStrategy: AttackStrategy;

  @OneToMany((type) => Battle, (battle) => battle.id)
  battle: Battle;
}
