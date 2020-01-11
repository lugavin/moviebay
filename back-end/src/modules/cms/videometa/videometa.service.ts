import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {VideoMetaEntity} from './videometa.entity';

@Injectable()
export class VideoMetaService {

    constructor(@InjectRepository(VideoMetaEntity) private readonly videoMetaRepository: Repository<VideoMetaEntity>) {
    }

}
