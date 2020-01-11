import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {UserDto} from './user.dto';
import BaseUtil from '../../comm/util/base.util';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    }

    async createUser(dto: UserDto): Promise<UserEntity> {
        const salt = BaseUtil.randomString();
        return this.userRepository.save(Object.assign(dto, {
            salt,
            password: BaseUtil.md5Hash(dto.password, salt),
            activated: true,
            createdAt: new Date(),
            createdBy: 'admin',
        }));
    }

    async updateUser(uid: number, dto: UserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne(uid);
        if (!user) {
            throw new HttpException({message: 'User not found!'}, HttpStatus.NOT_FOUND);
        }
        return this.userRepository.save(Object.assign(user, {updatedAt: new Date(), updatedBy: 'admin', ...dto}));
    }

    async deleteUser(uid: number): Promise<DeleteResult> {
        return this.userRepository.delete({id: uid});
    }

    async getUser(uid: number): Promise<UserEntity> {
        return this.userRepository.findOne(uid);
    }

    async getUserByName(username: string): Promise<UserEntity> {
        return this.userRepository
            .createQueryBuilder('u')
            .where('u.username = :username', {username})
            .getOne();
    }

}
