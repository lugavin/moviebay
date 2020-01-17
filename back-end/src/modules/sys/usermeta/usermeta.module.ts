import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserMetaEntity} from './usermeta.entity';
import {UserMetaService} from './usermeta.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserMetaEntity])],
    exports: [UserMetaService],
    providers: [UserMetaService],
})
export class UserMetaModule {
}
