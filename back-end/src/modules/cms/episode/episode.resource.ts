import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {EpisodeService} from './episode.service';
import {EpisodeEntity} from './episode.entity';

@Controller('episodes')
export class EpisodeResource {

    constructor(private readonly episodeService: EpisodeService) {
    }

    @Post()
    async createEpisodes(@Body() entities: EpisodeEntity[]): Promise<EpisodeEntity[]> {
        return this.episodeService.createEpisode(entities);
    }

    @Get()
    async getEpisodes(@Query('imdbId') imdbId: string): Promise<EpisodeEntity[]> {
        return this.episodeService.getEpisodesByImdbId(imdbId);
    }

}
