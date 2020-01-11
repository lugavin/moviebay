import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserMetaEntity} from './usermeta.entity';

@Injectable()
export class UserMetaService {

    constructor(@InjectRepository(UserMetaEntity) private readonly userMetaRepository: Repository<UserMetaEntity>) {
    }

}
