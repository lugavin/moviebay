import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PermEntity} from './perm.entity';

@Injectable()
export class PermService {

    constructor(@InjectRepository(PermEntity) private readonly permRepository: Repository<PermEntity>) {
    }

    async getPerms(username: string): Promise<PermEntity[]> {
        return this.permRepository.createQueryBuilder('p')
            .leftJoin('p.roles', 'r')
            .leftJoin('r.users', 'u')
            .where('u.username = :username', {username})
            .getMany();
    }

}