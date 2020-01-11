import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from './user.entity';
import {UserService} from './user.service';
import {UserResource} from './user.resource';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    exports: [UserService],
    providers: [UserService],
    controllers: [UserResource]
})
export class UserModule {
}