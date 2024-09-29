import { AxiosError } from 'axios';
import { catchError, Observable, throwError } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class ApiErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) {
          return throwError(() => error);
        }
        if (error instanceof AxiosError) {
          interface AxiosErrorMapper {
            [key: number]: { statusCode: number; message: string };
          }
          const axiosErrosMapper: AxiosErrorMapper = {
            401: {
              statusCode: 502,
              message: 'Failed to authenticate with external service',
            },
            503: {
              statusCode: 503,
              message:
                'External service is temporarily offline. Please try again later',
            },
          };
          return throwError(
            () =>
              new HttpException(
                axiosErrosMapper[error.code] || {
                  statusCode: 502,
                  message: 'External service encountered an internal error',
                },
                502,
              ),
          );
        }
        const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        const message = 'Internal server error';
        return throwError(
          () => new HttpException({ statusCode, message }, statusCode),
        );
      }),
    );
  }
}
