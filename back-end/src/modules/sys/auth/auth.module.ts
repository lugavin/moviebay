import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {AuthService} from './auth.service';
import {AuthResource} from './auth.resource';
import {UserModule} from '../user/user.module';
import {PermModule} from '../perm/perm.module';
import {jwtConfigFactory} from '../../../config/config.factory';

@Module({
    imports: [JwtModule.registerAsync({useFactory: jwtConfigFactory}), UserModule, PermModule],
    providers: [AuthService],
    controllers: [AuthResource],
})
export class AuthModule {
}
