import {NestFactory, Reflector} from '@nestjs/core';
import {ClassSerializerInterceptor, Logger, ValidationPipe} from '@nestjs/common';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import {AppModule} from './app.module';
import {ConfigFactory} from './config';
import {AuthGuard, HttpExceptionFilter, LoggingInterceptor} from './shared';
import {AuthService} from './modules/sys/auth/auth.service';

(async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    app.useGlobalInterceptors(new LoggingInterceptor(), new ClassSerializerInterceptor(app.get(Reflector)));
    app.useGlobalGuards(new AuthGuard(app.get(Reflector), app.get(AuthService)));
    // ValidationPipe 需要同时安装 class-validator 和 class-transformer 包
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    const {port, host} = ConfigFactory.createServerConfig();
    await app.listen(port, host, () => {
        Logger.log(`App running at => http://${host}:${port}/`);
    });
})();
