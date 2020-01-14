import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Like, Repository} from 'typeorm';
import {VideoEntity} from './video.entity';
import {Constants} from '../../shared/util/constants';

@Injectable()
export class VideoService {

    constructor(@InjectRepository(VideoEntity) private readonly videoRepository: Repository<VideoEntity>) {
    }

    async createVideo(entity: VideoEntity): Promise<VideoEntity> {
        return this.videoRepository.save(Object.assign(entity, {
            createdAt: new Date(),
            createdBy: Constants.ACCOUNT,
        }));
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
