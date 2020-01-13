/**
 * @see https://docs.nestjs.com/techniques/configuration
 */
export default () => ({
    secret: process.env.JWT_SECRET,
});