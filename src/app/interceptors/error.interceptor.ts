import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private static getFormattedMessage(err: HttpErrorResponse): string {
    switch (true) {
      case (err.status === 0):
        return 'Server not reachable. Check your internet connection.';
      case (!!err.error && !!err.error.error):
        return `${err.error.error}`;
      case (!!err.statusText && err.statusText.length > 2):
        return err.statusText;
      case (!!err.error):
        return err.error;
      default:
        return 'Oops something gone wrong';
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage;

          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${ErrorInterceptor.getFormattedMessage(error)}`;
          } else {
            // server-side error
            const prefix = error.status > 0 ? `Error ${error.status}: ` : 'Error: ';
            errorMessage = `${prefix}${ErrorInterceptor.getFormattedMessage(error)}`;
          }

          // log error
          console.error(errorMessage);

          throw error;
        }),
      );
  }
}
