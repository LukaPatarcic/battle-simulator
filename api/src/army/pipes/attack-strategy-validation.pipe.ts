import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { AttackStrategy } from '../army-attack-strategy.enum';

export class AttackStrategyValidationPipe implements PipeTransform {
  readonly allowedStrategies = [
    AttackStrategy.STRONGEST,
    AttackStrategy.WEAKEST,
    AttackStrategy.RANDOM,
  ];
  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase();
    if (!this.isStatusValid(value))
      throw new BadRequestException(`${value} is an invalid attack strategy`);

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStrategies.indexOf(status);
    return idx !== -1;
  }
}
