import {
  Controller,
  Get,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LogService } from './log.service';
import { GetLogsFilterDto } from './dto/get-logs-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('logs')
@UseGuards(AuthGuard())
export class LogController {
  constructor(private readonly logService: LogService) {}
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getLogs(
    @Query() getLogsFilterDto: GetLogsFilterDto,
    @GetUser() user: User,
  ) {
    return this.logService.getLogs(getLogsFilterDto.battleId, user);
  }
}
