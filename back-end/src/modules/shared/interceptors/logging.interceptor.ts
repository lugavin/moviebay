import {CallHandler, ExecutionContext, Logger, NestInterceptor,} from '@nestjs/common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Request} from 'express';

/**
 * @see https://docs.nestjs.com/interceptors
 */
export class LoggingInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<Request>();
        const now = Date.now();
        return next.handle()
            .pipe(tap(() => Logger.debug(`Request ${request.url} => ${Date.now() - now}ms`, LoggingInterceptor.name)));
    }

}