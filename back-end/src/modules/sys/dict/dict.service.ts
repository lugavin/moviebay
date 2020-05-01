import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, In} from 'typeorm';
import {DictEntity} from './dict.entity';

@Injectable()
export class DictService {

    constructor(@InjectRepository(DictEntity) private readonly dictRepository: Repository<DictEntity>) {
    }

    async createDict(entities: DictEntity[]): Promise<DictEntity[]> {
        // 直接调用 repository.save(entities) 会导致 @BeforeInsert() 不起作用
        return this.dictRepository.save(entities.map(entity => Object.assign(new DictEntity(), entity)));
    }

    async getDictByTag(tags: string[]): Promise<DictEntity[]> {
        return this.dictRepository.find({
            where: {tag: In(tags)},
            order: {tag: 'ASC', seq: 'ASC'},
            cache: true
        });
    }

}
