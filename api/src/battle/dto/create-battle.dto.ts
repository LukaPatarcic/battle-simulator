import { IsNotEmpty } from 'class-validator';

export class CreateBattleDto {
  @IsNotEmpty()
  title: string;
}
