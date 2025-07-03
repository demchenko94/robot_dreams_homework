import {
  CallHandler,
  ExecutionContext,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const date = new Date();

    return next.handle().pipe(
      tap(() => {
        const time = Date.now() - date.getTime();
        this.logger.log(`Handled in ${time}ms`);
      }),
    );
  }
}
