import {NestFactory, Reflector} from '@nestjs/core';
import {ClassSerializerInterceptor, ValidationPipe} from '@nestjs/common';
import {AppModule} from './app.module';
import {serverConfigFactory} from './config';
import {AuthGuard, LoggingInterceptor} from './shared';
import {AuthService} from './modules/sys/auth/auth.service';

(async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new LoggingInterceptor(), new ClassSerializerInterceptor(app.get(Reflector)));
    app.useGlobalGuards(new AuthGuard(app.get(Reflector), app.get(AuthService)));
    // ValidationPipe 需要同时安装 class-validator 和 class-transformer 包
    app.useGlobalPipes(new ValidationPipe());
    // app.useGlobalFilters(new HttpExceptionFilter());
    const {port, host, callback} = serverConfigFactory();
    await app.listen(port, host, callback);
})();
