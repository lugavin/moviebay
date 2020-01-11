import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {VisitEntity} from './visit.entity';

@Injectable()
export class VisitService {

    constructor(@InjectRepository(VisitEntity) private readonly visitRepository: Repository<VisitEntity>) {
    }

}
