import jwt_decode from 'jwt-decode';
import { Token } from '@models';


export const decodeToken = <T extends Token>(value: string): T | undefined => {
  return jwt_decode<T>(value);
};


export const isTokenExpired = <T extends Token>(value: string, expireOffset: number = 0): boolean => {
  const { exp = Date.now() } = decodeToken<T>(value) ?? { };
  const expiryDate = exp + (expireOffset * 1000);

  if (Date.now() >= expiryDate) {
    return false;
  }

  return true;
};
