import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CommentEntity} from './comment.entity';

@Injectable()
export class CommentService {

    constructor(@InjectRepository(CommentEntity) private readonly commentRepository: Repository<CommentEntity>) {
    }

}
