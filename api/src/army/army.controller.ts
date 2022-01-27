import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AttackStrategyValidationPipe } from './pipes/attack-strategy-validation.pipe';
import { CreateArmyDto } from './dto/create-army.dto';
import { ArmyService } from './army.service';

@Controller('armies')
export class ArmyController {
  constructor(private readonly armyService: ArmyService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({ transform: true }),
    AttackStrategyValidationPipe,
  )
  async createArmy(@Body() createArmyDto: CreateArmyDto) {
    return this.armyService.createArmy(createArmyDto);
  }
}
