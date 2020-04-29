import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {EpisodeEntity} from './episode.entity';

@Injectable()
export class EpisodeService {

  constructor(@InjectRepository(EpisodeEntity) private readonly episodeRepository: Repository<EpisodeEntity>) {
  }

}
