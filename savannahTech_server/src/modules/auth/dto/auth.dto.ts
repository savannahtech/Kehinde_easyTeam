import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty()
  password: string;
}
