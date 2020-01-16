export enum VideoStatus {
    OFFLINE,
    ONLINE,
}

export enum VideoType {
    MOVIE = 'MOVIE',
    TV = 'TV'
}

export enum DictTag {
    MOVIE_GENRE = 'MOVIE_GENRE',
    DRAMA_GENRE = 'DRAMA_GENRE',
    COUNTRY = 'COUNTRY',
    LANGUAGE = 'LANGUAGE',
}

export enum RedisKey {
    HKEY_USERS = 'USERS',
    HKEY_PERMS = 'PERMS',
}

export enum Formatter {
    DATE = 'YYYY-MM-DD',
    TIME = 'HH:mm:ss',
    DATETIME = 'YYYY-MM-DD HH:mm:ss',
}

export const Constants = {
    ACCOUNT: 'system',
    PERMS_KEY: 'perms',
};