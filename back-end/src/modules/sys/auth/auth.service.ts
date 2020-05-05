import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {RedisClient} from 'redis';
import {ActiveUser} from './dto/activeuser';
import {UserEntity} from '../user/user.entity';
import {UserService} from '../user/user.service';
import {PermService} from '../perm/perm.service';
import {RedisKey} from '../../shared/util/enums';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService,
                private readonly redisClient: RedisClient,
                private readonly userService: UserService,
                private readonly permService: PermService) {
    }

    async createToken(activeUser: ActiveUser, expiresIn: number = parseInt(process.env.JWT_EXPIRES, 10)): Promise<string> {
        return this.jwtService.signAsync(activeUser, {expiresIn});
    }

    async verifyToken(token: string): Promise<ActiveUser> {
        return this.jwtService.verifyAsync<ActiveUser>(token);
    }

    async getUser(username: string): Promise<UserEntity> {
        // @ts-ignore
        return this.redisClient.hgetAsync(RedisKey.HKEY_USERS, username).then(res => {
            if (!res) {
                return this.userService.getUserByName(username).then(entity => {
                    if (entity) {
                        this.redisClient.hset(RedisKey.HKEY_USERS, username, JSON.stringify(entity));
                    }
                    return entity;
                });
            }
            return JSON.parse(res);
        });
    }

    async getPerms(username: string): Promise<string[]> {
        // @ts-ignore
        return this.redisClient.hgetAsync(RedisKey.HKEY_PERMS, username).then(res => {
            if (!res) {
                return this.permService.getPerms(username).then(entities => {
                    if (entities && entities.length > 0) {
                        const perms = entities.map(entity => entity.code);
                        this.redisClient.hset(RedisKey.HKEY_PERMS, username, JSON.stringify(perms));
                        return perms;
                    }
                    return [];
                });
            }
            return JSON.parse(res);
        });

    }

}
