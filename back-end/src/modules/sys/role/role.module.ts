import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RoleEntity} from './role.entity';
import {RoleService} from './role.service';
import {RoleResource} from './role.resource';

@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity])],
    providers: [RoleService],
    controllers: [RoleResource],
})
export class RoleModule {
}