import { AuthorizedPlatformsEnum } from '../enums/authorized-platforms.enum';
import { IsEnum, IsPositive, IsUrl, MaxLength } from 'class-validator';

export class CreateSavedContentDto {
  @MaxLength(255)
  @IsUrl()
  url: string;

  @IsEnum(AuthorizedPlatformsEnum)
  platform: AuthorizedPlatformsEnum;

  @IsPositive()
  duration: number;
}
