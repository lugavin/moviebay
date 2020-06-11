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
        // 直接调用 repository.save(entities) 会导致 @BeforeInsert() 不起作用
        return this.episodeRepository.save(entities.map(entity => Object.assign(new EpisodeEntity(), entity))).then(episodes => {
            this.episodeRepository.createQueryBuilder()
                .orderBy({episode: 'DESC'})
                .take(1)
                .getOne()
                .then(lastEpisode => {
                    this.videoService.getVideoByImdbId(lastEpisode.imdbId).then(video => {
                        video.latestEpisode = lastEpisode;
                        this.videoService.createVideo([video]);
                    });
                });
            return episodes;
        });
    }

}
