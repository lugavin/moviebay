import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {UserDto} from './dto/user.dto';
import {BaseUtil} from '../../../shared';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    }

    async createUser(dto: UserDto): Promise<UserEntity> {
        const salt = BaseUtil.randomString();
        return this.userRepository.save(Object.assign(new UserEntity(), dto, {
            salt,
            password: BaseUtil.md5Hash(dto.password, salt),
            activated: true
        }));
    }

    async updateUser(uid: number, dto: UserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne(uid);
        if (!user) {
            throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
        }
        return this.userRepository.save(Object.assign(user, dto));
    }

    async deleteUser(uid: number): Promise<DeleteResult> {
        return this.userRepository.delete(uid);
    }

    async getUser(uid: number): Promise<UserEntity> {
        return this.userRepository.findOne(uid);
    }

    async getUserByName(username: string): Promise<UserEntity> {
        return this.userRepository.createQueryBuilder('u')
            .leftJoinAndSelect('u.roles', 'r')
            .where('u.username = :username', {username})
            .getOne();
    }

}
