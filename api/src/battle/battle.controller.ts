import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBattleDto } from './dto/create-battle.dto';
import { BattleService } from './battle.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('battles')
@UseGuards(AuthGuard())
export class BattleController {
  constructor(private readonly battleService: BattleService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  async createBattle(
    @Body() createBattleDto: CreateBattleDto,
    @GetUser() user: User,
  ) {
    return this.battleService.createBattle(createBattleDto, user);
  }

  @Get('/:id')
  async getBattleById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return this.battleService.getBattleById(id, user);
  }

  @Get()
  async getBattles(@GetUser() user: User) {
    return this.battleService.getBattles(user);
  }

  @Get('/start/:id')
  async startBattle(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return this.battleService.startBattle(id, user);
  }

  @Get('/restart/:id')
  async restartBattle(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return this.battleService.restartBattle(id, user);
  }
}
