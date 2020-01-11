import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {DictEntity} from './dict.entity';

@Injectable()
export class DictService {

    constructor(@InjectRepository(DictEntity) private readonly dictRepository: Repository<DictEntity>) {
    }

}