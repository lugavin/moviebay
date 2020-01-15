import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';
import {Request, Response} from 'express';

/**
 * Enumeration of HTTP status series.
 */
enum Series {
    INFORMATIONAL = 1,
    SUCCESSFUL = 2,
    REDIRECTION = 3,
    CLIENT_ERROR = 4,
    SERVER_ERROR = 5
}

/**
 * 统一异常处理: 统一格式返回Client端或进行错误Log处理
 *
 * @see https://docs.nestjs.com/exception-filters
 */
@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(error: Error, host: ArgumentsHost) {
        const retCode = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const retMsg = error.message;
        if (Math.floor(retCode / 100) === Series.SERVER_ERROR) {
            console.error(retCode, retMsg);
        }
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();
        response.status(retCode).json({
            retCode,
            retMsg,
            path: request.url,
            timestamp: Date.now(),
        });
    }

}