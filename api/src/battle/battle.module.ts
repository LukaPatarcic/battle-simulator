import { Module } from '@nestjs/common';
import { BattleController } from './battle.controller';
import { BattleService } from './battle.service';
import { BattleRepository } from './battle.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArmyRepository } from '../army/army.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BattleRepository, ArmyRepository])],
  controllers: [BattleController],
  providers: [BattleService],
  exports: [BattleService],
})
export class BattleModule {}
