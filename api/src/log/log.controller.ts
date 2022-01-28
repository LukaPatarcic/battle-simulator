import {
	Controller,
	Get,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { LogService } from './log.service';
import { GetLogsFilterDto } from './dto/get-logs-filter.dto';

@Controller('logs')
export class LogController {
	constructor(private readonly logService: LogService) {}
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
	async getLogs(@Query() getLogsFilterDto: GetLogsFilterDto) {
		return this.logService.getLogs(getLogsFilterDto.battleId);
	}
}
