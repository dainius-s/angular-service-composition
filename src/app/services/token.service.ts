import { Injectable } from '@angular/core';
import { isTokenExpired } from '@shared/helpers';
import { Token } from '@models';

@Injectable()
export class TokenService {
  private readonly tokenName = 'jwt_token';
  private readonly expireOffset = 5; // time in seconds

  set token(token: string | null) {
    localStorage.setItem(this.tokenName, token ?? '');
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenName);
  }

  remove(): void {
    return localStorage.removeItem(this.tokenName);
  }

  isExpired(): boolean {
    if (this.token) {
      return isTokenExpired<Token>(this.token, this.expireOffset);
    }

    return true;
  }
}
