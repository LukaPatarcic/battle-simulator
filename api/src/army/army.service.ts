import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArmyDto } from './dto/create-army.dto';
import { Army } from './army.entity';
import { BattleService } from '../battle/battle.service';
import { BattleStatus } from '../battle/battle-status.enum';

@Injectable()
export class ArmyService {
	constructor(private readonly battleService: BattleService) {}

	async createArmy(createArmyDto: CreateArmyDto): Promise<Army> {
		const { name, units, attackStrategy, battleId } = createArmyDto;
		const battle = await this.battleService.getBattleById(battleId);
		if (battle.status !== BattleStatus.IDLE) {
			throw new BadRequestException(
				'Battle is in progress or done and cannot add any more armies',
			);
		}
		const army = new Army(name, units, attackStrategy, battle);
		await army.save();

		return army;
	}
}
