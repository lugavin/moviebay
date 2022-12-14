import {NestFactory} from '@nestjs/core';
import {Logger} from '@nestjs/common';
import {SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {ConfigFactory} from './config';

/**
 * @see https://docs.nestjs.com/faq/request-lifecycle
 */
(async function bootstrap() {
    await NestFactory.create(AppModule).then(app => {
        SwaggerModule.setup(process.env.SWAGGER_API_PATH, app, SwaggerModule.createDocument(app, {
            openapi: process.env.SWAGGER_API_SPEC,
            info: {
                title: process.env.APP_NAME,
                version: process.env.APP_VERSION
            }
        }));
        const {port, host} = ConfigFactory.serverConfig();
        app.listen(port, host, () => {
            Logger.log(`App running at => http://${host}:${port}/`);
        });
    });
})();
