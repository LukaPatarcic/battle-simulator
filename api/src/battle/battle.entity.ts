import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Army } from '../army/army.entity';
import { IsNotEmpty } from 'class-validator';
import { Log } from '../log/log.entity';
import { BattleStatus } from './battle-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Battle extends BaseEntity {
  constructor(title: string, user: User) {
    super();
    this.title = title;
    this.user = user;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  title: string;

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

  @Column('varchar', { default: BattleStatus.IDLE })
  status: BattleStatus;

  @Column()
  userId: number;

  @OneToMany(() => Army, (army) => army.battle, { eager: true })
  armies: Army[];

  @OneToMany(() => Log, (log) => log.battle)
  logs: Log[];

  @ManyToOne(() => User, (user) => user.battles, { eager: false })
  user: User;
}
