import * as crypto from 'crypto';
import {v1 as uuidv1} from 'uuid';

export class BaseUtil {

    private static readonly CHARS: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    public static randomString(length: number = 19): string {
        let ret = '';
        for (let i = length; i > 0; --i) {
            ret += BaseUtil.CHARS[Math.floor(Math.random() * BaseUtil.CHARS.length)];
        }
        return ret;
    }

    public static md5Hash(source: string, salt: string): string {
        return crypto.createHash('md5').update(salt + source).digest('hex');
    }

    /**
     * 注意: UUID的无序性会严重影响数据库(例如MySQL)索引性能(可通过Snowflake算法生成唯一ID)
     * @see [Baidu-SnowflakeId](https://github.com/baidu/uid-generator)
     * @see [Twitter-Snowflake](https://github.com/twitter-archive/snowflake/releases/tag/snowflake-2010)
     */
    public static uuid(): string {
        return uuidv1();
    }

}
