import { CookieOptions } from 'express';

export const cookies = (days: number): CookieOptions => {
  const date = new Date();

  return {
    expires: new Date(date.setDate(date.getDate() + days)),
    sameSite: 'strict',
    httpOnly: true,
    secure: true,
  };
};
