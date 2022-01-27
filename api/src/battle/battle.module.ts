import { Module } from '@nestjs/common';
import { BattleController } from './battle.controller';
import { BattleService } from './battle.service';
import { BattleRepository } from './battle.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArmyRepository } from '../army/army.repository';
import { SocketModule } from '../socket/socket.module';
import { BattleCommand } from './battle.command';
import { LogRepository } from '../log/log.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BattleRepository, ArmyRepository, LogRepository]),
    SocketModule,
  ],
  controllers: [BattleController],
  providers: [BattleService, BattleCommand],
  exports: [BattleService],
})
export class BattleModule {}
