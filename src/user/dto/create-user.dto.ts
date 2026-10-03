import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 12,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
  })
  password: string;
}
