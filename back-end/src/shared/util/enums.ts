export enum VodStatus {
    OFFLINE,
    ONLINE,
}

export enum VodType {
    MOVIE = 'movie',
    SERIES = 'series',
}

export enum DictTag {
    MOVIE_GENRE = 'movie-genre',
    SERIES_GENRE = 'series-genre',
    COUNTRY = 'country',   // https://zh.wikipedia.org/wiki/ISO_3166-1
    LANGUAGE = 'language', // https://zh.wikipedia.org/wiki/ISO_639-1
}

export enum RedisKey {
    HKEY_PERMS = 'perms',
}

export enum Formatter {
    DATE = 'YYYY-MM-DD',
    TIME = 'HH:mm:ss',
    DATETIME = 'YYYY-MM-DD HH:mm:ss',
}

/**
 * Enumeration of HTTP status series.
 */
export enum HttpSeries {
    INFORMATIONAL = 1,
    SUCCESSFUL = 2,
    REDIRECTION = 3,
    CLIENT_ERROR = 4,
    SERVER_ERROR = 5,
}
