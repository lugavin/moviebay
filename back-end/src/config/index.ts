import {ClientOpts} from 'redis';
import {DatabaseType} from "typeorm";
import {MailerOptions} from '@nestjs-modules/mailer';
import {ClientOptions} from '@elastic/elasticsearch';
import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export class ConfigFactory {

    public static serverConfig(): ServerConfig {
        return {
            host: process.env.SERVER_HOST || 'localhost',
            port: parseInt(process.env.SERVER_PORT, 10) || 3000,
        };
    }

    public static jwtConfig(): JwtConfig {
        return {
            secret: process.env.JWT_SECRET,
            accessTokenExpires: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES, 10),
            refreshTokenExpires: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES, 10)
        };
    }

    public static datasourceConfig(): TypeOrmModuleOptions {
        return {
            type: process.env.TYPEORM_TYPE as DatabaseType,
            url: process.env.TYPEORM_URL,
            cache: Boolean(process.env.TYPEORM_CACHE),
            logging: Boolean(process.env.TYPEORM_LOGGING),
            synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
            autoLoadEntities: Boolean(process.env.TYPEORM_AUTO_LOAD_ENTITIES),
            entities: !process.env.TYPEORM_ENTITIES ? [] : process.env.TYPEORM_ENTITIES.split(','),
        };
    }

    public static redisConfig(): ClientOpts {
        return {
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        };
    }

    public static mailConfig(): MailerOptions {
        return {
            transport: {
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                }
            },
            defaults: {
                from: `"${process.env.APP_NAME}" <${process.env.MAIL_USER}>`
            }
        };
    }

    public static esConfig(): ClientOptions {
        return {
            node: process.env.ES_NODE
        }
    }

}

export interface ServerConfig {
    host: string;
    port: number;
}

export interface JwtConfig {
    secret: string;
    accessTokenExpires: number;
    refreshTokenExpires: number;
}
