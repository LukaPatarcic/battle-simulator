import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBattleDto } from './dto/create-battle.dto';
import { Battle } from './battle.entity';
import { BattleRepository } from './battle.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BattleService {
  constructor(
    @InjectRepository(BattleRepository)
    private readonly battleRepository: BattleRepository,
  ) {}
  async createBattle(createBattleDto: CreateBattleDto): Promise<Battle> {
    const { title } = createBattleDto;
    const battle = new Battle(title);
    await battle.save();

    return battle;
  }

  async getBattleById(id: number): Promise<Battle> {
    const battle = await this.battleRepository.findOne(id);
    if (!battle) throw new NotFoundException();
    return battle;
  }

  async getBattles(): Promise<Battle[]> {
    return this.battleRepository.find();
  }
}
