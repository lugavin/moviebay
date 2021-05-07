import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EpisodeEntity} from './episode.entity';
import {EpisodeService} from './episode.service';
import {EpisodeController} from './episode.controller';
import {VideoModule} from '../video/video.module';

@Module({
    imports: [TypeOrmModule.forFeature([EpisodeEntity]), VideoModule],
    providers: [EpisodeService],
    controllers: [EpisodeController],
})
export class EpisodeModule {
}
