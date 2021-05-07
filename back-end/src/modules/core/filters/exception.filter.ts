import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger} from '@nestjs/common';

/**
 * 统一异常处理: 统一格式返回Client端或进行错误Log处理
 *
 * @see https://docs.nestjs.com/exception-filters
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {
        const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();
        Logger.error(`${req.method} ${req.url}`, exception.stack, HttpExceptionFilter.name);
        res.code(status).send({
            retCode: status,
            retMsg: exception.message,
            path: req.url,
            method: req.method,
            timestamp: new Date().toISOString() // Date.now()
        });
    }

}
