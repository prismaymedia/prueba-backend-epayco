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
export class ExternalMoviesErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const response = error.response;
        const status =
          response?.status ||
          response?.statusCode ||
          HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
          response?.data?.message ||
          response?.data?.status_message ||
          'An error occurred while processing the request';

        if (error.isAxiosError) {
          return throwError(
            () =>
              new HttpException(
                {
                  statusCode: status,
                  message: message,
                  error: 'ExternalMoviesError',
                },
                status,
              ),
          );
        }
        return throwError(
          () =>
            new HttpException(
              {
                statusCode: status,
                message: error.response?.message || error.message,
                error: error.response?.error || 'Bad request',
              },
              status,
            ),
        );
      }),
    );
  }
}
