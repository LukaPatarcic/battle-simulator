import { EntityRepository, Repository } from 'typeorm';
import { Army } from './army.entity';
import { AttackStrategy } from './army-attack-strategy.enum';

@EntityRepository(Army)
export class ArmyRepository extends Repository<Army> {
	constructor() {
		super();
	}

	async getTarget(army: Army) {
		switch (army.attackStrategy) {
		case AttackStrategy.RANDOM: {
			return await this.findRandomArmy(army.id, army.battle.id);
		}
		case AttackStrategy.WEAKEST: {
			return await this.findWeakestArmy(army.id, army.battle.id);
		}
		case AttackStrategy.STRONGEST: {
			return await this.findStrongestArmy(army.id, army.battle.id);
		}
		}
	}

	public findWeakestArmy(id: number, battleId: number) {
		return this.createQueryBuilder('army')
			.leftJoinAndSelect('army.battle', 'battle')
			.andWhere('army.id != :id', { id })
			.andWhere('battle.id = :battleId', { battleId })
			.andWhere('army.units > 0')
			.orderBy('army.units', 'ASC')
			.getOne();
	}

	async findStrongestArmy(id: number, battleId: number) {
		return this.createQueryBuilder('army')
			.leftJoinAndSelect('army.battle', 'battle')
			.andWhere('army.id != :id', { id })
			.andWhere('battle.id = :battleId', { battleId })
			.andWhere('army.units > 0')
			.orderBy('army.units', 'DESC')
			.getOne();
	}

	async findRandomArmy(id: number, battleId: number) {
		return this.createQueryBuilder('army')
			.leftJoinAndSelect('army.battle', 'battle')
			.andWhere('army.id != :id', { id })
			.andWhere('battle.id = :battleId', { battleId })
			.andWhere('army.units > 0')
			.orderBy('RAND()')
			.getOne();
	}

	async findAliveArmiesInBattle(battleId: number) {
		return this.createQueryBuilder('army')
			.leftJoinAndSelect('army.battle', 'battle')
			.andWhere('battle.id = :id', {
				id: battleId,
			})
			.andWhere('army.units > 0')
			.getMany();
	}
}
