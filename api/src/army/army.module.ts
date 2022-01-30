import { Module } from '@nestjs/common';
import { ArmyController } from './army.controller';
import { ArmyService } from './army.service';
import { BattleModule } from '../battle/battle.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [BattleModule, AuthModule],
  controllers: [ArmyController],
  providers: [ArmyService],
})
export class ArmyModule {}
