import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {EpisodeEntity} from './episode.entity';
import {VideoService} from '../video/video.service';

@Injectable()
export class EpisodeService {

    constructor(private readonly videoService: VideoService,
                @InjectRepository(EpisodeEntity) private readonly episodeRepository: Repository<EpisodeEntity>) {
    }

    async createEpisode(entities: EpisodeEntity[]): Promise<EpisodeEntity[]> {
        const episodes: EpisodeEntity[] = entities.sort((e1, e2) => e1.episode - e2.episode)
            .map(entity => Object.assign(new EpisodeEntity(), entity));
        return this.episodeRepository.save(episodes).then(() => {
            const lastEpisode: EpisodeEntity = episodes[episodes.length - 1];
            this.videoService.updateLatestEpisode(lastEpisode.imdbId, lastEpisode);
            return episodes;
        });
    }

}
