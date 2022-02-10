import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { CreateBattleDto } from './dto/create-battle.dto';
import { Battle } from './battle.entity';
import { BattleRepository } from './battle.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Army } from '../army/army.entity';
import { ArmyRepository } from '../army/army.repository';
import { Log } from '../log/log.entity';
import { BattleStatus } from './battle-status.enum';
import { SocketService } from '../socket/socket.service';
import { LogRepository } from '../log/log.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class BattleService implements OnApplicationBootstrap {
  MINIMUM_ARMY_REQUIREMENT = 3;
  MAXIMUM_NUMBER_OF_ACTIVE_BATTLES = 5;
  constructor(
    @InjectRepository(BattleRepository)
    private readonly battleRepository: BattleRepository,
    @InjectRepository(LogRepository)
    private readonly logRepository: LogRepository,
    @InjectRepository(ArmyRepository)
    private readonly armyRepository: ArmyRepository,
    private readonly socketService: SocketService,
  ) {}
  async createBattle(
    createBattleDto: CreateBattleDto,
    user: User,
  ): Promise<Battle> {
    const { title } = createBattleDto;
    const battle = new Battle(title, user);
    await battle.save();

    return battle;
  }

  async getBattleById(id: number, user: User): Promise<Battle> {
    const battle = await this.battleRepository.findOne({ where: { id, user } });
    if (!battle) throw new NotFoundException('Battle could not be found');
    return battle;
  }

  async getBattles(user: User): Promise<Battle[]> {
    return this.battleRepository.find({ user });
  }

  async onApplicationBootstrap() {
    const battle = await this.battleRepository.findBattlesInProgress();
    battle.forEach((battle) => this.playGame(battle));
  }

  async startBattle(id: number, user: User) {
    const battle = await this.battleRepository.findBattleWithArmies(id, user);
    const battlesInProgress = await this.battleRepository.find({
      where: { status: BattleStatus.IN_PROGRESS },
    });
    if (!battle) {
      throw new NotFoundException();
    }
    if (battle.armies.length < this.MINIMUM_ARMY_REQUIREMENT) {
      throw new BadRequestException(
        `Minimum number of armies to start a battle is ${this.MINIMUM_ARMY_REQUIREMENT}`,
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

    battle.status = BattleStatus.IN_PROGRESS;
    await battle.save();
    this.playGame(battle);

    return { ok: 1 };
  }

  async restartBattle(id: number, user: User) {
    const battle = await this.getBattleById(id, user);
    const armies = [];
    battle.armies.forEach((army) => {
      army.units = army.initialUnits;
      armies.push(army.save());
    });
    battle.status = BattleStatus.IDLE;
    await this.logRepository.delete({ battle: battle });
    await Promise.all([...armies, battle.save()]);

    return { ok: 1 };
  }

  private async playGame(battle: Battle) {
    const { id } = battle;
    let winner: Army = null;
    while (!winner) {
      const armies = await this.armyRepository.findAliveArmiesInBattle(id);
      if (armies.length === 1) {
        winner = armies[0];
        break;
      }
      for (let i = 0; i < armies.length; i++) {
        const army = armies[i];
        if (army.units === 0) continue;

        const target = await this.armyRepository.getTarget(army);
        const attackChance = this.calculateAttackChance(army.units);
        const attackDamage = this.calculateAttackDamage(army.units);
        const reloadTime = this.calculateReloadTimeInMiliseconds(army.units);
        target.units = this.dealDamageToArmy(
          target,
          attackDamage,
          attackChance,
        );

        const log = new Log(army.name, target.name, attackDamage, battle);
        await log.save();
        this.socketService.socket.emit('log', log);

        await this.sleep(reloadTime);
        await Promise.all([target.save(), army.save()]);
      }
    }
    battle.status = BattleStatus.DONE;
    this.socketService.socket.emit('winner', winner);
    await battle.save();
  }

  private calculateAttackChance(units: number) {
    const unitStrength = units * 0.01;
    return unitStrength < 0.1 ? 0.1 : unitStrength;
  }

  private calculateAttackDamage(units: number) {
    const unitDamange = 0.5 * units;
    return Math.floor(units === 1 ? 1 : unitDamange);
  }

  private calculateReloadTimeInMiliseconds(units: number) {
    return 0.01 * units * 1000;
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
