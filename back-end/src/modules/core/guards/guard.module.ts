import {Module} from '@nestjs/common';
import {APP_GUARD, Reflector} from '@nestjs/core';
import {AuthService} from '../../sys/auth/auth.service';
import {AuthModule} from '../../sys';
import {AuthGuard} from './auth.guard';

@Module({
    imports: [AuthModule],
    providers: [{
        provide: APP_GUARD,
        useFactory: (reflector: Reflector, authService: AuthService) => {
            return new AuthGuard(reflector, authService)
        },
        inject: [Reflector, AuthService]
    }]
})
export class GuardModule {
}
