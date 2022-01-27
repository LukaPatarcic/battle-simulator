import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Battle } from '../battle/battle.entity';

@Entity()
export class Log extends BaseEntity {
  constructor(
    attacker: string,
    target: string,
    damage: number,
    battle: Battle,
  ) {
    super();
    this.attacker = attacker;
    this.target = target;
    this.damage = damage;
    this.battle = battle;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  attacker: string;

  @Column()
  @IsNotEmpty()
  target: string;

  @Column()
  @IsNotEmpty()
  damage: number;

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

  @ManyToOne(() => Battle, (battle) => battle.logs)
  battle: Battle;
}
