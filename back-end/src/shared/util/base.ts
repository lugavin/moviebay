import * as crypto from 'crypto';
import {nanoid} from 'nanoid';

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
     * @see <a href="https://github.com/baidu/uid-generator">Baidu SnowflakeId</a>
     * @see <a href="https://github.com/twitter-archive/snowflake/releases/tag/snowflake-2010">Twitter Snowflake</a>
     */
    public static uuid(): string {
        return nanoid();
    }

}
