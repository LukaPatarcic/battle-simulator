import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { AttackStrategy } from '../army-attack-strategy.enum';

export class CreateArmyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Min(80)
  @Max(100)
  units: number;

  @IsNotEmpty()
  attackStrategy: AttackStrategy;

  @IsNotEmpty()
  @IsNumber()
  battleId: number;
}
