import {ClientOpts} from 'redis';

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
