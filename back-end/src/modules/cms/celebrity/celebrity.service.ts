import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CelebrityEntity} from './celebrity.entity';

@Injectable()
export class CelebrityService {

    constructor(@InjectRepository(CelebrityEntity) private readonly celebrityRepository: Repository<CelebrityEntity>) {
    }

}
