import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService } from '@services';


@Injectable()
export class AuthenticateGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): UrlTree | boolean {
    return this.tokenService.isExpired() ? this.router.parseUrl('auth') : true;
  }
}
