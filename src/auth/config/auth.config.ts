import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => {
  const ATSK = process.env.ACCESS_TOKEN_SECRET_KEY;
  const RTSK = process.env.REFRESH_TOKEN_SECRET_KEY;
  const ATSKEI = process.env.ACCESS_TOKEN_SECRET_KEY_EXPIRES_IN;
  const RTSKEI = process.env.REFRESH_TOKEN_SECRET_KEY_EXPIRES_IN;
  const JI = process.env.JWT_ISSUER;

  return {
    ACCESS_TOKEN_SECRET_KEY: ATSK,
    REFRESH_TOKEN_SECRET_KEY: RTSK,
    ACCESS_TOKEN_SECRET_KEY_EXPIRES_IN: ATSKEI,
    REFRESH_TOKEN_SECRET_KEY_EXPIRES_IN: RTSKEI,
    JWT_ISSUER: JI,
  };
});
