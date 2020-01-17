/**
 * @see https://docs.nestjs.com/techniques/configuration
 */
export function redisConfigFactory() {
    return {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    };
}

export function jwtConfigFactory() {
    return {
        secret: process.env.JWT_SECRET,
    };
}
