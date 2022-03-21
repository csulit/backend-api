import { IsEmail } from 'class-validator';

export default class ForgotPasswordDTO {
  @IsEmail()
  readonly email: string;
}
