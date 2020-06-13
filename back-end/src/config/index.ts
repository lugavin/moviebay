export const serverConfigFactory = () => ({
    host: process.env.SERVER_HOST,
    port: parseInt(process.env.SERVER_PORT, 10)
});

export const redisConfigFactory = () => ({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10)
});

export const jwtConfigFactory = () => ({
    secret: process.env.JWT_SECRET, // For JwtModule
    accessTokenExpires: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES, 10),
    refreshTokenExpires: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES, 10)
});
