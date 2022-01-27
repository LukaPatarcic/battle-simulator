import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Battle } from '../battle/battle.entity';
import { IsNotEmpty, Max, Min } from 'class-validator';
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
    this.initialUnits = units;
    this.attackStrategy = attackStrategy;
    this.battle = battle;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @Min(80)
  @Max(100)
  @Column()
  initialUnits: number;

  @IsNotEmpty()
  @Min(80)
  @Max(100)
  @Column()
  units: number;

  @IsNotEmpty()
  @Column()
  attackStrategy: AttackStrategy;

  @Column('int', { default: 0 })
  reloadTime: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @ManyToOne(() => Battle, (battle) => battle.id)
  battle: Battle;
}
