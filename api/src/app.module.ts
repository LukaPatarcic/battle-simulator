import { Module } from '@nestjs/common';
import { BattleModule } from './battle/battle.module';
import { ArmyModule } from './army/army.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { LogsModule } from './log/logs.module';
import { AppGateway } from './app.gateway';
import { SocketModule } from './socket/socket.module';
import { CommandModule } from 'nestjs-command';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    BattleModule,
    ArmyModule,
    CommandModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
    ConfigModule.forRoot(),
    LogsModule,
    SocketModule,
    AuthModule,
  ],
  providers: [AppGateway],
})
export class AppModule {}
