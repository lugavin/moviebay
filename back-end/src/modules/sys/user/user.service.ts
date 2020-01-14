import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Equal, Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {UserDto} from './user.dto';
import BaseUtil from '../../shared/util/base.util';
import {Constants} from '../../shared/util/constants';
import {RedisClient} from 'redis';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
                private readonly redisClient: RedisClient) {
    }

    async createUser(dto: UserDto): Promise<UserEntity> {
        const salt = BaseUtil.randomString();
        return this.userRepository.save(Object.assign(dto, {
            salt,
            password: BaseUtil.md5Hash(dto.password, salt),
            activated: true,
            createdAt: new Date(),
            createdBy: Constants.ACCOUNT,
        }));
    }

    async updateUser(uid: number, dto: UserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne(uid);
        if (!user) {
            throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
        }
        return this.userRepository.save(Object.assign(user, {
            updatedAt: new Date(),
            updatedBy: Constants.ACCOUNT,
            ...dto
        }));
    }

    async deleteUser(uid: number): Promise<DeleteResult> {
        return this.userRepository.delete({id: uid});
    }

    async getUser(uid: number): Promise<UserEntity> {
        return this.userRepository.findOne(uid);
    }

    async getUserByName(username: string): Promise<UserEntity> {
        const redisKey = 'USER';
        // @ts-ignore
        return this.redisClient.hgetAsync(redisKey, username).then((res) => {
            if (!res) {
                return this.userRepository.findOne({
                    username: Equal(`${username}`),
                }).then(user => {
                    this.redisClient.hset(redisKey, username, JSON.stringify(user));
                    return user;
                });
            }
            return JSON.parse(res);
        });
    }

}
