import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRepository } from './log.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LogRepository])],
  controllers: [LogController],
  providers: [LogService],
})
export class LogsModule {}
