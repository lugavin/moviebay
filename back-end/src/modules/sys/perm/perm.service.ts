import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PermEntity} from './perm.entity';

@Injectable()
export class PermService {

    constructor(@InjectRepository(PermEntity) private readonly permRepository: Repository<PermEntity>) {
    }

}