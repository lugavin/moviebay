import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PermEntity} from './perm.entity';
import {PermService} from './perm.service';
import {PermResource} from './perm.resource';

@Module({
    imports: [TypeOrmModule.forFeature([PermEntity])],
    exports: [PermService],
    providers: [PermService],
    controllers: [PermResource],
})
export class PermModule {
}
