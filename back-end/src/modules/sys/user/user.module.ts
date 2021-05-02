import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from './user.entity';
import {UserService} from './user.service';
import {UserController} from './user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    exports: [UserService],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {
}
