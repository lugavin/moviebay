import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {AuthService} from './auth.service';
import {AuthResource} from './auth.resource';
import {UserModule} from '../user/user.module';
import jwtFactory from '../../../config/jwt.config';

@Module({
    imports: [JwtModule.registerAsync({useFactory: jwtFactory}), UserModule],
    providers: [AuthService],
    controllers: [AuthResource],
})
export class AuthModule {
}