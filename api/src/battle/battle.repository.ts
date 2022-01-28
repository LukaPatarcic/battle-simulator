import { EntityRepository, Repository } from 'typeorm';
import { Battle } from './battle.entity';
import { BattleStatus } from './battle-status.enum';

@EntityRepository(Battle)
export class BattleRepository extends Repository<Battle> {
	findBattleWithArmies(id: number) {
		return this.createQueryBuilder('battle')
			.leftJoinAndSelect('battle.armies', 'army')
			.where('battle.id = :id', { id })
			.getOne();
	}

	findBattlesInProgress() {
		return this.find({
			where: { status: BattleStatus.IN_PROGRESS },
		});
	}
}
