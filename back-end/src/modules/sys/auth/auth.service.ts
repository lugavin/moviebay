import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {ActiveUser} from './auth.dto';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) {
    }

    async createToken(activeUser: ActiveUser, expiresIn: number = parseInt(process.env.JWT_EXPIRES, 10)): Promise<string> {
        return this.jwtService.signAsync(activeUser, {expiresIn});
    }

    async verifyToken(token: string): Promise<ActiveUser> {
        return this.jwtService.verifyAsync<ActiveUser>(token);
    }

}