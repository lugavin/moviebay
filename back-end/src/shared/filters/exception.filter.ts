import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger} from '@nestjs/common';
import {HttpSeries} from '../util';

/**
 * 统一异常处理: 统一格式返回Client端或进行错误Log处理
 *
 * @see https://docs.nestjs.com/exception-filters
 */
@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(error: Error, host: ArgumentsHost) {
        const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        if (Math.floor(status / 100) === HttpSeries.SERVER_ERROR) {
            Logger.error(error.message, error.stack, HttpExceptionFilter.name);
        }
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();
        res.code(status).send({
            retCode: status,
            retMsg: error.message,
            // path: req.url, // For Express
            timestamp: new Date().toISOString() // Date.now()
        });
    }

}
