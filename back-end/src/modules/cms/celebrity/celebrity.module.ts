import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CelebrityEntity} from './celebrity.entity';
import {CelebrityService} from './celebrity.service';
import {CelebrityResource} from './celebrity.resource';

@Module({
    imports: [TypeOrmModule.forFeature([CelebrityEntity])],
    providers: [CelebrityService],
    controllers: [CelebrityResource],
})
export class CelebrityModule {
}
