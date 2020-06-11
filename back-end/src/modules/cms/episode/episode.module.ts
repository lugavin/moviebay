import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EpisodeEntity} from './episode.entity';
import {EpisodeService} from './episode.service';
import {EpisodeResource} from './episode.resource';
import {VideoModule} from '../video/video.module';

@Module({
    imports: [TypeOrmModule.forFeature([EpisodeEntity]), VideoModule],
    providers: [EpisodeService],
    controllers: [EpisodeResource],
})
export class EpisodeModule {
}
