import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Battle } from './battle.entity';
import { BattleRepository } from './battle.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Army } from '../army/army.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const casual = require('casual');

@Injectable()
export class BattleCommand {
  constructor(
    @InjectRepository(BattleRepository)
    private readonly battleRepository: BattleRepository,
  ) {}

  @Command({
    command: 'generate:data',
    describe: 'generate init data',
  })
  async generateData() {
    console.log('Starting to generate random data...');
    const armiesCount = await this.battleRepository.count();
    if (armiesCount > 0) {
      console.log('Data present, skipping generation');
      return;
    }
    for (let i = 0; i < 3; i++) {
      const promises = [];
      const battle = new Battle(casual.title);
      await battle.save();
      const range = casual.integer(3, 10);
      for (let i = 0; i < range; i++) {
        const army = new Army(
          casual.title,
          casual.integer(80, 100),
          casual.random_element(['RANDOM', 'WEAKEST', 'STRONGEST']),
          battle,
        );
        promises.push(army.save());
      }
      await Promise.all(promises);
    }
    console.log('Done generating data');
  }
}
