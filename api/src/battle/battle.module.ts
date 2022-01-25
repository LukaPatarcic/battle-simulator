import { Module } from '@nestjs/common';
import { BattleController } from './battle.controller';
import { BattleService } from './battle.service';
import { BattleRepository } from './battle.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BattleRepository])],
  controllers: [BattleController],
  providers: [BattleService],
  exports: [BattleService],
})
export class BattleModule {}
