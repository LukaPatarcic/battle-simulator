import { BadRequestException, PipeTransform } from '@nestjs/common';
import { AttackStrategy } from '../army-attack-strategy.enum';
import { CreateArmyDto } from '../dto/create-army.dto';

export class AttackStrategyValidationPipe implements PipeTransform {
  readonly allowedStrategies = [
    AttackStrategy.STRONGEST,
    AttackStrategy.WEAKEST,
    AttackStrategy.RANDOM,
  ];
  transform(value: CreateArmyDto): CreateArmyDto {
    const attackStrategy = value.attackStrategy.toUpperCase() as AttackStrategy;
    if (!this.isStatusValid(attackStrategy))
      throw new BadRequestException(
        `${attackStrategy} is an invalid attack strategy`,
      );

    return value;
  }

  private isStatusValid(status: AttackStrategy) {
    const idx = this.allowedStrategies.indexOf(status);
    return idx !== -1;
  }
}
