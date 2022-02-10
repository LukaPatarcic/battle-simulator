import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArmyDto } from './dto/create-army.dto';
import { Army } from './army.entity';
import { BattleService } from '../battle/battle.service';
import { BattleStatus } from '../battle/battle-status.enum';
import { User } from '../auth/user.entity';
import { use } from 'passport';

@Injectable()
export class ArmyService {
  constructor(private readonly battleService: BattleService) {}

  async createArmy(createArmyDto: CreateArmyDto, user: User): Promise<Army> {
    const { name, units, attackStrategy, battleId } = createArmyDto;
    const battle = await this.battleService.getBattleById(battleId, user);
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
