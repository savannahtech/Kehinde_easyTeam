import {
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsString,
  Length,
  IsStrongPassword,
} from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 30, { message: 'name should be length 5 and 30' })
  name: string;

  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @Length(8, 20, {
    message: 'Password should be has length with 4 to 20 characters',
  })
  @IsStrongPassword()
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(Gender, {
    message: 'gender must be either male or female',
  })
  readonly gender: Gender;
}
