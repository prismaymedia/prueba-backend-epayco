import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error.response) {
          const statusCode = error.response.status;
          const message =
            error.response.data.message || error.response.statusText;
          return throwError(() => new HttpException(message, statusCode));
        } else {
          return throwError(
            () =>
              new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
          );
        }
      }),
    );
  }
}
