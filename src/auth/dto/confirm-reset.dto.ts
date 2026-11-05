import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class ConfirmResetDto {
  @IsNotEmpty()
  @Length(6, 6)
  code: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
