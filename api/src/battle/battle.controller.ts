import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBattleDto } from './dto/create-battle.dto';
import { BattleService } from './battle.service';

@Controller('battles')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createBattle(@Body() createBattleDto: CreateBattleDto) {
    return this.battleService.createBattle(createBattleDto);
  }

  @Get('/:id')
  async getBattleById(@Param('id', ParseIntPipe) id: number) {
    return this.battleService.getBattleById(id);
  }

  @Get()
  async getBattles() {
    return this.battleService.getBattles();
  }
}
