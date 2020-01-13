import {NestFactory, Reflector} from '@nestjs/core';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import {LoggingInterceptor} from './modules/comm/interceptors/logging.interceptor';
import {AppModule} from './app.module';
import {AuthGuard} from './modules/comm/guards/auth.guard';
import {AuthService} from './modules/sys/auth/auth.service';

(async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalGuards(new AuthGuard(app.get(Reflector), app.get(AuthService)));
    await app.listen(process.env.SERVER_PORT);
})();