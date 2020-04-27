import {CallHandler, ExecutionContext, Logger, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

/**
 * @see https://docs.nestjs.com/interceptors
 */
export class LoggingInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        return next.handle()
            .pipe(tap(() => Logger.debug(`Request ${context.getHandler().name} completed in ${Date.now() - now}ms`, LoggingInterceptor.name)));
    }

}
