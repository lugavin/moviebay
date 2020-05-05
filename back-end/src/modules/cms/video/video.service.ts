import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Equal, Like, Repository} from 'typeorm';
import {VideoEntity} from './video.entity';
import {VodStatus} from '../../shared/util/enums';
import {PageResponse} from '../../shared/page/page.response';
import {VideoDto} from './dto/video.dto';
import {ObjectLiteral} from 'typeorm/common/ObjectLiteral';

@Injectable()
export class VideoService {

    constructor(@InjectRepository(VideoEntity) private readonly videoRepository: Repository<VideoEntity>) {
    }

    async createVideo(entities: VideoEntity[]): Promise<VideoEntity[]> {
        // 直接调用 repository.save(entities) 会导致 @BeforeInsert() 不起作用
        return this.videoRepository.save(entities.map(entity => Object.assign(new VideoEntity(), entity, {status: VodStatus.ONLINE})));
    }

    async deleteVideo(vid: number): Promise<DeleteResult> {
        return this.videoRepository.delete({id: vid});
    }

    async getVideo(vid: number): Promise<VideoEntity> {
        return this.videoRepository.findOne(vid);
    }

    async search(page: number, pageSize: number, keyword: string): Promise<PageResponse<VideoEntity>> {
        return this.videoRepository.findAndCount({
            where: [
                {name: Like(`%${keyword}%`)},
                {title: Like(`%${keyword}%`)}
            ],
            skip: (page - 1) * pageSize,
            take: pageSize,
            order: {createdAt: -1}
        }).then(res => new PageResponse<VideoEntity>(page, pageSize, res[0], res[1]));
    }

    async getPage(page: number, pageSize: number, params: VideoDto): Promise<PageResponse<VideoEntity>> {
        return this.videoRepository.findAndCount({
            where: VideoService.resolveParams(params),
            skip: (page - 1) * pageSize,
            take: pageSize,
            order: {createdAt: -1}
        }).then(res => new PageResponse<VideoEntity>(page, pageSize, res[0], res[1]));
    }

    private static resolveParams(params: VideoDto): ObjectLiteral {
        const res = {};
        if (params.type) {
            Object.assign(res, {type: Equal(params.type)});
        }
        if (params.genre) {
            Object.assign(res, {genre: Equal(params.genre)});
        }
        return res;
    }

}
