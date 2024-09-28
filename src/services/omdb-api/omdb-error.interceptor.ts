import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class OmdbErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof AxiosError) {
          const errorResponseMessage = error.response.data.Error;
          const errorMessage = `OMDB API: ${errorResponseMessage}`;

          if (error.status === 400) {
            return throwError(() => new BadRequestException(errorMessage));
          }

          if (error.status === 401) {
            return throwError(() => new UnauthorizedException(errorMessage));
          }

          if (error.status === 403) {
            return throwError(() => new ForbiddenException(errorMessage));
          }

          if (error.status === 404) {
            return throwError(
              () => new NotFoundException(`OMDB API: endpoint not found`),
            );
          }
        }

        return throwError(
          () => new InternalServerErrorException(`OMDB API: ${error.message}`),
        );
      }),
    );
  }
}
