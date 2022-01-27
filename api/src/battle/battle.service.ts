import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBattleDto } from './dto/create-battle.dto';
import { Battle } from './battle.entity';
import { BattleRepository } from './battle.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Army } from '../army/army.entity';
import { ArmyRepository } from '../army/army.repository';
import { Log } from '../log/log.entity';
import { BattleStatus } from './battle-status.enum';

@Injectable()
export class BattleService {
  MINIMUM_ARMY_REQUIERMENT = 3;
  MAXIMUM_NUMBER_OF_ACTIVE_BATTLES = 5;
  constructor(
    @InjectRepository(BattleRepository)
    private readonly battleRepository: BattleRepository,
    @InjectRepository(ArmyRepository)
    private readonly armyRepository: ArmyRepository,
  ) {}
  async createBattle(createBattleDto: CreateBattleDto): Promise<Battle> {
    const { title } = createBattleDto;
    const battle = new Battle(title);
    await battle.save();

    return battle;
  }

  async getBattleById(id: number): Promise<Battle> {
    const battle = await this.battleRepository.findOne(id);
    if (!battle) throw new NotFoundException('Battle could not be found');
    return battle;
  }

  async getBattles(): Promise<Battle[]> {
    return this.battleRepository.find();
  }

  async startBattle(id: number) {
    const battle = await this.battleRepository.findBattleWithArmies(id);
    const battlesInProgress =
      await this.battleRepository.findBattlesInProgress();
    if (!battle) {
      throw new NotFoundException();
    }
    if (battle.armies.length < this.MINIMUM_ARMY_REQUIERMENT) {
      throw new BadRequestException(
        `Minimum number of armies to start a battle is ${this.MINIMUM_ARMY_REQUIERMENT}`,
      );
    }

    if (battlesInProgress.length > this.MAXIMUM_NUMBER_OF_ACTIVE_BATTLES) {
      throw new BadRequestException(
        `Maximum number of active battles is ${this.MAXIMUM_NUMBER_OF_ACTIVE_BATTLES}`,
      );
    }

    if (battle.status === BattleStatus.IN_PROGRESS) {
      throw new BadRequestException('Game already in progress');
    }

    if (battle.status === BattleStatus.DONE) {
      throw new BadRequestException(
        'Game is complete. Please restart the game.',
      );
    }

    const game = await this.playGame(battle);

    return game;
  }

  async restartBattle(id: number) {
    const battle = await this.getBattleById(id);
    const armies = [];
    battle.armies.forEach((army) => {
      army.units = army.initialUnits;
      armies.push(army.save());
    });
    battle.status = BattleStatus.IDLE;
    await Promise.all([...armies, battle.save()]);

    return { ok: 1 };
  }

  private async playGame(battle: Battle) {
    const { id } = battle;
    let winner: Army = null;
    const logs = [];
    while (!winner) {
      const armies = await this.armyRepository.findAliveArmiesInBattle(id);
      for (let i = 0; i < armies.length; i++) {
        const army = armies[i];
        if (army.units === 0) continue;
        if (armies.length === 1) {
          winner = army;
          break;
        }
        const target = await this.armyRepository.getTarget(army);
        const attackChance = this.calculateAttackChance(army.units);
        const attackDamage = this.calculateAttackDamage(army.units);
        const reloadTime = this.calculateReloadTime(army.units);
        target.units = this.dealDamageToArmy(
          target,
          attackDamage,
          attackChance,
        );
        army.reloadTime = reloadTime;
        const log = new Log(army.name, target.name, attackDamage, battle);
        logs.push(log);
        await this.sleep(reloadTime * 1000);
        await Promise.all([target.save(), army.save(), log.save()]);
      }
    }
    battle.status = BattleStatus.DONE;
    await battle.save();
    return { winner, logs };
  }

  private calculateAttackChance(units: number) {
    const unitStrength = units * 0.01;
    return unitStrength < 0.1 ? 0.1 : unitStrength;
  }

  private calculateAttackDamage(units: number) {
    const unitDamange = 0.5 * units;
    return Math.floor(units === 1 ? 1 : unitDamange);
  }

  private calculateReloadTime(units: number) {
    return 0.01 * units;
  }

  private dealDamageToArmy(
    army: Army,
    attackDamage: number,
    attackChance: number,
  ) {
    if (this.random(attackChance)) {
      return army.units - attackDamage;
    }
    return army.units;
  }

  private random(chanceInPercent) {
    return Math.random() > chanceInPercent / 100;
  }

  private sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
