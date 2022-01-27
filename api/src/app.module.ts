import { Module } from '@nestjs/common';
import { BattleModule } from './battle/battle.module';
import { ArmyModule } from './army/army.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { LogsModule } from './log/logs.module';

@Module({
  imports: [
    BattleModule,
    ArmyModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
    ConfigModule.forRoot(),
    LogsModule,
  ],
})
export class AppModule {}
