import {NestFactory, Reflector} from '@nestjs/core';
import {ClassSerializerInterceptor, ValidationPipe} from '@nestjs/common';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import {AppModule} from './app.module';
import {AuthService} from './modules/sys/auth/auth.service';
import {AuthGuard} from './shared';
import {LoggingInterceptor} from './shared';

(async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    app.useGlobalInterceptors(new LoggingInterceptor(), new ClassSerializerInterceptor(app.get(Reflector)));
    // app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalGuards(new AuthGuard(app.get(Reflector), app.get(AuthService)));
    // ValidationPipe 需要同时安装 class-validator 和 class-transformer 包
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.SERVER_PORT);
})();
