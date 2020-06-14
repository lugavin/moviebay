import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CelebrityEntity} from './celebrity.entity';

@Injectable()
export class CelebrityService {

    constructor(@InjectRepository(CelebrityEntity) private readonly celebrityRepository: Repository<CelebrityEntity>) {
    }

    async createCelebrity(entities: CelebrityEntity[]): Promise<CelebrityEntity[]> {
        return this.celebrityRepository.save(entities.map(entity => Object.assign(new CelebrityEntity(), entity)));
    }

}
