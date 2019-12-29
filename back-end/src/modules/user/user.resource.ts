import {Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserService} from './user.service';
import {UserDto} from "./user.dto";

@Controller("/users")
export class UserResource {

    constructor(private readonly userService: UserService) {
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(@Body() dto: UserDto) {
        return this.userService.createUser(dto);
    }

    @Put(':uid')
    async updateUser(@Param('uid') uid: number, @Body() dto: UserDto) {
        return await this.userService.updateUser(uid, dto);
    }

    @Delete(':uid')
    async deleteUser(@Param('uid') uid: number) {
        return await this.userService.deleteUser(uid);
    }

    @Get(':uid')
    async getUser(@Param('uid') uid: number) {
        return this.userService.getUser(uid);
    }

}
