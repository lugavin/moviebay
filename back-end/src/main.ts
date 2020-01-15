import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import {AuthGuard} from './modules/shared/guards/auth.guard';
import {AuthService} from './modules/sys/auth/auth.service';
import {LoggingInterceptor} from './modules/shared/interceptors/logging.interceptor';

(async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalGuards(new AuthGuard(app.get(Reflector), app.get(AuthService)));
    //app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new LoggingInterceptor());
    await app.listen(process.env.SERVER_PORT);
})();