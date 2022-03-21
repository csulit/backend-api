import { IsString } from 'class-validator';

export default class PasswordResetTokenDTO {
  @IsString()
  readonly passwordResetToken: string;
}
