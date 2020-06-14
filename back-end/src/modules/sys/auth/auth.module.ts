import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthEntity} from './auth.entity';
import {AuthService} from './auth.service';
import {AuthResource} from './auth.resource';
import {UserModule} from '../user/user.module';
import {PermModule} from '../perm/perm.module';
import {ConfigFactory} from '../../../config';

@Module({
    imports: [TypeOrmModule.forFeature([AuthEntity]), JwtModule.registerAsync({useFactory: ConfigFactory.createJwtConfig}), UserModule, PermModule],
    providers: [AuthService],
    controllers: [AuthResource]
})
export class AuthModule {
}
