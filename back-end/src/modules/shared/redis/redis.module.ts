import {Global, Module} from '@nestjs/common';
import * as Redis from 'redis';
import * as Bluebird from 'bluebird';
import {redisConfigFactory} from '../../../config/config.factory';

@Global()
@Module({
    providers: [{
        provide: Redis.RedisClient,
        useFactory: () => {
            Bluebird.promisifyAll(Redis);
            return Redis.createClient(redisConfigFactory());
        }
    }],
    exports: [Redis.RedisClient]
})
export class RedisModule {
}