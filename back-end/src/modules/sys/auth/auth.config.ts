export function jwtConfigFactory() {
    return {
        secret: process.env.JWT_SECRET
    };
}
