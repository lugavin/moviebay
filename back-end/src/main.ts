import {NestFactory, Reflector} from '@nestjs/core';
import {ClassSerializerInterceptor, Logger, ValidationPipe, INestApplication} from '@nestjs/common';
import {AppModule} from './app.module';
import {ConfigFactory} from './config';
import {AuthGuard, HttpExceptionFilter, LoggingInterceptor} from './shared';
import {AuthService} from './modules/sys/auth/auth.service';
import {SwaggerModule} from '@nestjs/swagger';

/**
 * @see https://docs.nestjs.com/faq/request-lifecycle
 */
(async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new LoggingInterceptor(), new ClassSerializerInterceptor(app.get(Reflector)));
    app.useGlobalGuards(new AuthGuard(app.get(Reflector), app.get(AuthService)));
    // ValidationPipe 需要同时安装 class-validator 和 class-transformer 包
    app.useGlobalPipes(new ValidationPipe());
    // app.useGlobalFilters(new HttpExceptionFilter());
    SwaggerModule.setup(process.env.SWAGGER_API_PATH, app, SwaggerModule.createDocument(app, {
        openapi: process.env.SWAGGER_API_SPEC,
        info: {
            title: process.env.APP_NAME,
            version: process.env.APP_VERSION
        }
    }));
    const {port, host} = ConfigFactory.createServerConfig();
    await app.listen(port, host, () => {
        Logger.log(`App running at => http://${host}:${port}/`);
    });
})();
