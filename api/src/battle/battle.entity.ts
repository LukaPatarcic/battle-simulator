import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Army } from '../army/army.entity';
import { JoinColumn } from 'typeorm/browser';

@Entity()
export class Battle extends BaseEntity {
  constructor(title: string) {
    super();
    this.title = title;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Army, (army) => army.battle, { eager: true })
  army: Army;
}
