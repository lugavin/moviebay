import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Equal, Repository} from 'typeorm';
import {DictEntity} from './dict.entity';

@Injectable()
export class DictService {

    constructor(@InjectRepository(DictEntity) private readonly dictRepository: Repository<DictEntity>) {
    }

    async createDict(entity: DictEntity): Promise<DictEntity> {
        return this.dictRepository.save(entity);
    }

    async getDictByTag(tag: string): Promise<DictEntity[]> {
        return this.dictRepository.find({
            tag: Equal(`${tag}`)
        });
    }

}