import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CelebrityEntity} from './celebrity.entity';
import {CelebrityService} from './celebrity.service';
import {CelebrityController} from './celebrity.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CelebrityEntity])],
    providers: [CelebrityService],
    controllers: [CelebrityController],
})
export class CelebrityModule {
}
