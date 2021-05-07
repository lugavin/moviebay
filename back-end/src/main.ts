import {NestFactory} from '@nestjs/core';
import {Logger} from '@nestjs/common';
import {SwaggerModule} from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import {AppModule} from './app.module';
import {ConfigFactory} from './config';

/**
 * Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
 * RateLimit can help protect your applications from brute-force attacks.
 * @see https://docs.nestjs.com/faq/request-lifecycle
 */
(async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    app.use(rateLimit());
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
