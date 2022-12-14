import {Global, Module} from '@nestjs/common';
import {JwtModule as JWT} from '@nestjs/jwt';
import {ConfigFactory} from 'src/config';

/**
 * Modules can export their internal providers. In addition, they can re-export modules that they import.
 * @see https://docs.nestjs.com/modules#global-modules
 * @see https://docs.nestjs.com/modules#module-re-exporting
 */
@Global()
@Module({
    imports: [JWT.registerAsync({useFactory: ConfigFactory.jwtConfig})],
    exports: [JWT]
})
export class JwtModule {
}
