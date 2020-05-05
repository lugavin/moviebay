export enum VodStatus {
    OFFLINE,
    ONLINE,
}

export enum VodType {
    MOVIE = 'movie',
    TV = 'tv',
}

export enum DictTag {
    MOVIE_GENRE = 'movie-genre',
    DRAMA_GENRE = 'drama-genre',
    COUNTRY = 'country',   // https://zh.wikipedia.org/wiki/ISO_3166-1
    LANGUAGE = 'language', // https://zh.wikipedia.org/wiki/ISO_639-1
}

export enum RedisKey {
    HKEY_USERS = 'users',
    HKEY_PERMS = 'perms',
}

export enum Formatter {
    DATE = 'YYYY-MM-DD',
    TIME = 'HH:mm:ss',
    DATETIME = 'YYYY-MM-DD HH:mm:ss',
}
