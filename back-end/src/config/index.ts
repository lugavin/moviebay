import {ClientOpts} from 'redis';
import {MailerOptions} from '@nestjs-modules/mailer';
import {ClientOptions} from '@elastic/elasticsearch';

export class ConfigFactory {

    public static createServerConfig(): ServerConfig {
        return {
            host: process.env.SERVER_HOST,
            port: parseInt(process.env.SERVER_PORT, 10)
        };
    }

    public static createJwtConfig(): JwtConfig {
        return {
            secret: process.env.JWT_SECRET,
            accessTokenExpires: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES, 10),
            refreshTokenExpires: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES, 10)
        };
    }

    public static createRedisConfig(): ClientOpts {
        return {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT, 10)
        };
    }

    public static createMailConfig(): MailerOptions {
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

    public static createEsConfig(): ClientOptions {
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
