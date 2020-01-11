import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CommentMetaEntity} from './commentmeta.entity';

@Injectable()
export class CommentMetaService {

    constructor(@InjectRepository(CommentMetaEntity) private readonly commentMetaRepository: Repository<CommentMetaEntity>) {
    }

}
