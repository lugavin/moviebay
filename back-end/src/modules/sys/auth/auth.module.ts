import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthEntity} from './auth.entity';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UserModule} from '../user/user.module';
import {PermModule} from '../perm/perm.module';

@Module({
    imports: [TypeOrmModule.forFeature([AuthEntity]), UserModule, PermModule],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {
}
