import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger} from '@nestjs/common';

/**
 * Enumeration of HTTP status series.
 */
enum Series {
    INFORMATIONAL = 1,
    SUCCESSFUL = 2,
    REDIRECTION = 3,
    CLIENT_ERROR = 4,
    SERVER_ERROR = 5,
}

/**
 * 统一异常处理: 统一格式返回Client端或进行错误Log处理
 *
 * @see https://docs.nestjs.com/exception-filters
 */
@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(error: Error, host: ArgumentsHost) {
        const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        if (Math.floor(status / 100) === Series.SERVER_ERROR) {
            Logger.error(error.message, error.stack, HttpExceptionFilter.name);
        }
        const context = host.switchToHttp();
        const response = context.getResponse();
        // const request = context.getRequest();
        // response.status(status).json({ // For Express
        //     retCode: status,
        //     retMsg: error.message,
        //     path: request.url,
        //     timestamp: Date.now(),
        // });
        response.code(status).send({ // For Fastify
            retCode: status,
            retMsg: error.message,
            timestamp: Date.now(),
        });
    }

}
