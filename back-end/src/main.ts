import {NestFactory, Reflector} from '@nestjs/core';
import {ClassSerializerInterceptor} from '@nestjs/common';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import {AppModule} from './app.module';
import {AuthService} from './modules/sys/auth/auth.service';
import {AuthGuard} from './modules/shared/guards/auth.guard';
import {LoggingInterceptor} from './modules/shared/interceptors/logging.interceptor';

(async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    app.useGlobalInterceptors(new LoggingInterceptor(), new ClassSerializerInterceptor(app.get(Reflector)));
    // app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalGuards(new AuthGuard(app.get(Reflector), app.get(AuthService)));
    await app.listen(process.env.SERVER_PORT);
})();
