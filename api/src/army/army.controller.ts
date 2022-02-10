import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AttackStrategyValidationPipe } from './pipes/attack-strategy-validation.pipe';
import { CreateArmyDto } from './dto/create-army.dto';
import { ArmyService } from './army.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('armies')
@UseGuards(AuthGuard())
export class ArmyController {
  constructor(private readonly armyService: ArmyService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({ transform: true }),
    AttackStrategyValidationPipe,
  )
  async createArmy(
    @Body() createArmyDto: CreateArmyDto,
    @GetUser() user: User,
  ) {
    return this.armyService.createArmy(createArmyDto, user);
  }
}
