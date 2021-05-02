import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PermEntity} from './perm.entity';
import {PermService} from './perm.service';
import {PermController} from './perm.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PermEntity])],
    exports: [PermService],
    providers: [PermService],
    controllers: [PermController],
})
export class PermModule {
}
