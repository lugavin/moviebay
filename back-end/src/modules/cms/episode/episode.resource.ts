import {Body, Controller, Post} from '@nestjs/common';
import {EpisodeService} from './episode.service';
import {EpisodeEntity} from './episode.entity';

@Controller('episodes')
export class EpisodeResource {

    constructor(private readonly episodeService: EpisodeService) {
    }

    @Post()
    async createEpisode(@Body() entities: EpisodeEntity[]): Promise<EpisodeEntity[]> {
        return this.episodeService.createEpisode(entities);
    }

}
