import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EpisodeEntity} from './episode.entity';
import {EpisodeService} from './episode.service';
import {EpisodeResource} from './episode.resource';

@Module({
  imports: [TypeOrmModule.forFeature([EpisodeEntity])],
  providers: [EpisodeService],
  controllers: [EpisodeResource],
})
export class EpisodeModule {
}
