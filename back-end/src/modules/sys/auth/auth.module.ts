import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {AuthService} from './auth.service';
import {AuthResource} from './auth.resource';
import {UserModule} from '..';

@Module({
    imports: [JwtModule.register({secret: 'your-secret'}), UserModule],
    providers: [AuthService],
    controllers: [AuthResource],
})
export class AuthModule {
}