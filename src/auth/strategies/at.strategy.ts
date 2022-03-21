import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import Jwt from '../interfaces/jwt.interface';

@Injectable()
export class AtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService<{
      auth: { ACCESS_TOKEN_SECRET_KEY: string };
    }>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        /**
         * Allow hybrid access token extraction.
         * @param req
         * @returns access token
         */
        (req: Request) => {
          const fromCookies = req?.cookies?.['x-access-token'];
          const fromHeader = req?.headers?.authorization?.split(' ')[1];

          return fromCookies || fromHeader;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.ACCESS_TOKEN_SECRET_KEY', {
        infer: true,
      }),
    });
  }

  async validate({ id }: Jwt) {
    return id;
  }
}
