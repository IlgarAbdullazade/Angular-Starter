import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {HttpError} from './error.types';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';

          if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            switch (error.status) {

              case HttpError.BadRequest:
                console.log('Bad Request 400');
                break;

              case HttpError.Unauthorized:
                console.log('Unauthorized 401');
                break;

              case HttpError.NotFound:
                console.log('Not Found 404');
                break;

              case HttpError.TimeOut:
                console.log('TimeOut 408');
                break;

              case HttpError.Forbidden:
                console.log('Forbidden 403');
                break;

              case HttpError.InternalServerError:
                console.log('big bad 500');
                break;
            }
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}
