import { IsNotEmpty } from 'class-validator';

export class GetLogsFilterDto {
  @IsNotEmpty()
  battleId: number;
}
