import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository, Equal} from 'typeorm';
import {UserEntity} from './user.entity';
import {UserDto} from './dto/user.dto';
import {BaseUtil} from 'src/shared';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    }

    async createUser(dto: UserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: [
                {username: Equal(`${dto.username}`)},
                {email: Equal(`${dto.email}`)}
            ]
        });
        if (user) {
            throw new HttpException('Account already used!', HttpStatus.BAD_REQUEST);
        }
        const salt = BaseUtil.randomString();
        return this.userRepository.save(Object.assign(new UserEntity(), dto, {
            password: BaseUtil.md5Hash(dto.password, salt),
            salt,
            activated: true
        }));
    }

    async updateUser(uid: number, dto: UserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({id: uid});
        if (!user) {
            throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
        }
        return this.userRepository.save(Object.assign(user, dto));
    }

    async deleteUser(uid: number): Promise<DeleteResult> {
        return this.userRepository.delete(uid);
    }

    async getUser(uid: number): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: {id: uid},
            relations: ['roles']
        });
    }

    async getUserByName(username: string): Promise<UserEntity> {
        return this.userRepository.createQueryBuilder('u')
            .leftJoinAndSelect('u.roles', 'r')
            .where('u.username = :username', {username})
            .getOne();
    }

    async registerUser(dto: UserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: [
                {username: Equal(`${dto.username}`)},
                {email: Equal(`${dto.email}`)}
            ]
        });
        if (user) {
            throw new HttpException('Account already used!', HttpStatus.BAD_REQUEST);
        }
        const salt = BaseUtil.randomString();
        return this.userRepository.save(Object.assign(new UserEntity(), dto, {
            password: BaseUtil.md5Hash(dto.password, salt),
            salt,
            activated: false,
            activationKey: BaseUtil.uuid()
        }));
    }

    async activateUser(activationKey: string): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({activationKey});
        if (!user) {
            throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
        }
        return this.userRepository.save(Object.assign(user, {activated: true, activationKey: null}));
    }

    async requestPasswordReset(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({email});
        if (!user) {
            throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
        }
        return this.userRepository.save(Object.assign(user, {resetKey: BaseUtil.uuid(), resetDate: new Date()}));
    }

    async finishPasswordReset(resetKey: string, newPassword: string): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({resetKey});
        if (!user) {
            throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
        }
        const salt = BaseUtil.randomString();
        return this.userRepository.save(Object.assign(user, {
            password: BaseUtil.md5Hash(newPassword, salt),
            salt,
            resetKey: null,
            resetDate: null
        }));
    }

}
