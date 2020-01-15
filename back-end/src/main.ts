import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import {AuthService} from './modules/sys/auth/auth.service';
import {AuthGuard} from './modules/shared/guards/auth.guard';
import {HttpExceptionFilter} from './modules/shared/filters/exception.filter';
import {LoggingInterceptor} from './modules/shared/interceptors/logging.interceptor';

(async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalGuards(new AuthGuard(app.get(Reflector), app.get(AuthService)));
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(process.env.SERVER_PORT);
})();