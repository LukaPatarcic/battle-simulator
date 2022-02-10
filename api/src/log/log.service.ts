import { Injectable } from '@nestjs/common';
import { LogRepository } from './log.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogRepository)
    private readonly logRepository: LogRepository,
  ) {}

  async getLogs(battleId: number, user: User) {
    return this.logRepository.findLogsByBattleId(battleId, user);
  }
}
