import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {DeleteResult} from 'typeorm';
import {UserService} from './user.service';
import {UserEntity} from './user.entity';
import {UserDto} from './dto/user.dto';
import {AuthDecorator as Auth} from '../../../shared';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {
    } // same as constructor(@Inject(UserService) userService: UserService)

    @Post()
    @Auth('user:create')
    async createUser(@Body() dto: UserDto): Promise<UserEntity> {
        return this.userService.createUser(dto);
    }

    @Put(':uid')
    @Auth('user:update')
    async updateUser(@Param('uid') uid: number, @Body() dto: UserDto): Promise<UserEntity> {
        return this.userService.updateUser(uid, dto);
    }

    @Delete(':uid')
    @Auth('user:delete')
    async deleteUser(@Param('uid') uid: number): Promise<DeleteResult> {
        return this.userService.deleteUser(uid);
    }

    @Get(':uid')
    @Auth('user:query')
    async getUser(@Param('uid') uid: number): Promise<UserEntity> {
        return this.userService.getUser(uid);
    }

}
