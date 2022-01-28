import { EntityRepository, Repository } from 'typeorm';
import { Log } from './log.entity';

@EntityRepository(Log)
export class LogRepository extends Repository<Log> {
	findLogsByBattleId(battleId: number) {
		return this.createQueryBuilder('log')
			.leftJoinAndSelect('log.battle', 'battle')
			.andWhere('battle.id = :battleId', { battleId })
			.getMany();
	}
}
