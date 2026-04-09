import { IsEmail, IsIn, IsString, IsStrongPassword } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email!: string;
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password!: string;
  @IsString()
  name!: string;
}
