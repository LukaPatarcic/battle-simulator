import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Battle } from '../battle/battle.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  constructor(username, password, salt) {
    super();
    this.username = username;
    this.password = password;
    this.salt = salt;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @OneToMany(() => Battle, (battle) => battle.user, { eager: true })
  battles: Battle[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
