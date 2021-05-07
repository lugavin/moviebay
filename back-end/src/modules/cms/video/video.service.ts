import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Like, Repository} from 'typeorm';
import {VideoEntity} from './video.entity';
import {VideoDto} from './dto/video.dto';
import {PageRes, VodStatus} from 'src/shared';
import {EpisodeEntity} from '../episode/episode.entity';
import {UpdateResult} from 'typeorm/query-builder/result/UpdateResult';

@Injectable()
export class VideoService {

    constructor(@InjectRepository(VideoEntity) private readonly videoRepository: Repository<VideoEntity>) {
    }

    async createVideo(entities: VideoEntity[]): Promise<VideoEntity[]> {
        // 直接调用 repository.save(entities) 会导致 @BeforeInsert() 不起作用
        return this.videoRepository.save(entities.map(entity => Object.assign(new VideoEntity(), entity, {status: VodStatus.ONLINE})));
    }

    async deleteVideo(vid: number): Promise<DeleteResult> {
        return this.videoRepository.delete(vid);
    }

    async getVideo(vid: number): Promise<VideoEntity> {
        return this.videoRepository.findOne(vid, {relations: ['latestEpisode']});
    }

    async updateLatestEpisode(imdbId: string, latestEpisode: EpisodeEntity): Promise<UpdateResult> {
        return this.videoRepository.update({imdbId}, {latestEpisode});
    }

    async search(page: number, pageSize: number, keyword: string): Promise<PageRes<VideoEntity>> {
        return this.videoRepository.findAndCount({
            where: [
                {title: Like(`%${keyword}%`)},
                {altTitle: Like(`%${keyword}%`)}
            ],
            skip: (page - 1) * pageSize,
            take: pageSize,
            order: {createdAt: -1}
        }).then(res => new PageRes<VideoEntity>(page, pageSize, res[0], res[1]));
    }

    async getPage(page: number, pageSize: number, params: VideoDto): Promise<PageRes<VideoEntity>> {
        const queryBuilder = this.videoRepository.createQueryBuilder();
        const {type, genres, countries, sort} = params;
        if (type) {
            queryBuilder.andWhere('type = :type', {type});
        }
        if (genres) {
            // SQL: SELECT * FROM table WHERE genres @> ARRAY['action']::varchar[] -- @>: 包含
            queryBuilder.andWhere('genres @> :genres', {genres: Array.isArray(genres) ? genres : genres.split(',')});
        }
        if (countries) {
            // SQL: SELECT * FROM table WHERE countries && ARRAY['CN']::varchar[] -- &&: 重叠(有共同元素)
            queryBuilder.andWhere('countries && :countries', {countries: Array.isArray(countries) ? countries : countries.split(',')});
        }
        return queryBuilder.skip((page - 1) * pageSize)
            .take(pageSize)
            .orderBy(!sort ? {created_at: 'DESC'} : {[sort]: 'DESC'})
            .getManyAndCount()
            .then(res => new PageRes<VideoEntity>(page, pageSize, res[0], res[1]));
    }

}
