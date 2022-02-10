import { EntityRepository, Repository } from 'typeorm';
import { Log } from './log.entity';
import { User } from '../auth/user.entity';

@EntityRepository(Log)
export class LogRepository extends Repository<Log> {
  findLogsByBattleId(battleId: number, user: User) {
    return this.createQueryBuilder('log')
      .leftJoinAndSelect('log.battle', 'battle')
      .andWhere('battle.id = :battleId', { battleId })
      .andWhere('battle.userId = :userId', { userId: user.id })
      .getMany();
  }
}
