import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { StandardReponse, customResponse } from './standard-response';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, StandardReponse>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<StandardReponse> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        return customResponse('Request was successful', statusCode, data);
      }),
    );
  }
}
