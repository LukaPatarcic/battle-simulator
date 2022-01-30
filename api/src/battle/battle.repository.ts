import { EntityRepository, Repository } from 'typeorm';
import { Battle } from './battle.entity';
import { BattleStatus } from './battle-status.enum';
import { User } from '../auth/user.entity';

@EntityRepository(Battle)
export class BattleRepository extends Repository<Battle> {
  findBattleWithArmies(id: number, user: User) {
    return this.createQueryBuilder('battle')
      .leftJoinAndSelect('battle.armies', 'army')
      .where('battle.id = :id', { id })
      .where('battle.userId = :userId', { userId: user.id })
      .getOne();
  }

  findBattlesInProgress() {
    return this.find({
      where: { status: BattleStatus.IN_PROGRESS },
    });
  }
}
