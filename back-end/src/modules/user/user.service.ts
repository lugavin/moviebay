import {Injectable, HttpStatus, HttpException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, DeleteResult} from 'typeorm';
import {User} from './user.entity';
import {UserDto} from "./user.dto";

@Injectable()
export class UserService {

    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

    async createUser(dto: UserDto): Promise<User> {
        return this.userRepository.save(dto);
    }

    async updateUser(uid: number, dto: UserDto): Promise<User> {
        let user = await this.userRepository.findOne(uid);
        if (!user) {
            throw new HttpException({message: 'User not found!'}, HttpStatus.NOT_FOUND);
        }
        return await this.userRepository.save(Object.assign(user, dto));
    }

    async deleteUser(uid: number): Promise<DeleteResult> {
        return await this.userRepository.delete({id: uid});
    }

    async getUser(uid: number): Promise<User> {
        return await this.userRepository.findOne(uid);
    }

}
