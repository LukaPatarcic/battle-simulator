import { Injectable } from '@nestjs/common';
import { LogRepository } from './log.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LogService {
	constructor(
    @InjectRepository(LogRepository)
    private readonly logRepository: LogRepository,
	) {}

	async getLogs(battleId: number) {
		return this.logRepository.findLogsByBattleId(battleId);
	}
}
