import * as crypto from 'crypto';

const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default {
    randomString(length: number = 19): string {
        let ret = '';
        for (let i = length; i > 0; --i) {
            ret += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        return ret;
    },
    md5Hash(source: string, salt: string): string {
        return crypto.createHash('md5').update(salt + source).digest('hex');
    }
};