import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Like, Repository} from 'typeorm';
import {VideoEntity} from './video.entity';

@Injectable()
export class VideoService {

    constructor(@InjectRepository(VideoEntity) private readonly videoRepository: Repository<VideoEntity>) {
    }

    async createVideo(entities: VideoEntity[]): Promise<VideoEntity[]> {
        // 直接调用 repository.save(entities) 会导致 @BeforeInsert() 不起作用
        return this.videoRepository.save(entities.map(entity => Object.assign(new VideoEntity(), entity)));
    }

    async deleteVideo(vid: number): Promise<DeleteResult> {
        return this.videoRepository.delete({id: vid});
    }

    async getVideo(vid: number): Promise<VideoEntity> {
        return this.videoRepository.findOne(vid);
    }

    async search(keyword: string): Promise<VideoEntity[]> {
        return this.videoRepository.find({
            keywords: Like(`%${keyword}%`)
        });
    }

}
