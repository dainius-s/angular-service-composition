import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '@services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError(error => this.handleNotAuthorized(error)),
      );
  }

  private handleNotAuthorized(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401 ) {
      // logout
      this.tokenService.remove();
    }
    throw error;
  }
}
