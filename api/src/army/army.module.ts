import { Module } from '@nestjs/common';
import { ArmyController } from './army.controller';
import { ArmyService } from './army.service';
import { BattleModule } from '../battle/battle.module';

@Module({
	controllers: [ArmyController],
	providers: [ArmyService],
	imports: [BattleModule],
})
export class ArmyModule {}
