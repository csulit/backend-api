import {
  IsDateString,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Match } from '../decorators/match.decorator';

export default class ChangePasswordDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak!',
  })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Match('password', { message: 'Password does not match!' })
  readonly confirmPassword: string;

  @IsDateString()
  readonly passwordChangedAt: Date;
}
