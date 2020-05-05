import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {DeleteResult} from 'typeorm';
import {UserService} from './user.service';
import {UserEntity} from './user.entity';
import {UserDto} from './dto/user.dto';
import {Auth} from '../../shared/decorators/auth.decorator';

@Controller('users')
export class UserResource {

    constructor(private readonly userService: UserService) {
    } // same as constructor(@Inject(UserService) userService: UserService)

    @Post()
    async createUser(@Body() dto: UserDto): Promise<UserEntity> {
        return this.userService.createUser(dto);
    }

    @Put(':uid')
    async updateUser(@Param('uid') uid: number, @Body() dto: UserDto): Promise<UserEntity> {
        return this.userService.updateUser(uid, dto);
    }

    @Delete(':uid')
    async deleteUser(@Param('uid') uid: number): Promise<DeleteResult> {
        return this.userService.deleteUser(uid);
    }

    @Get(':uid')
    @Auth('user:query')
    async getUser(@Param('uid') uid: number): Promise<UserEntity> {
        return this.userService.getUser(uid);
    }

}
