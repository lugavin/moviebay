import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {LinkEntity} from './link.entity';

@Injectable()
export class LinkService {

    constructor(@InjectRepository(LinkEntity) private readonly linkRepository: Repository<LinkEntity>) {
    }

}
