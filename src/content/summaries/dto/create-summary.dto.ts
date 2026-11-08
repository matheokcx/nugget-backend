import { IsPositive, MaxLength } from 'class-validator';

export class CreateSummaryDto {
  @MaxLength(5000)
  summary: string;

  @IsPositive()
  savedContentId: number;
}
