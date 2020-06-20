export enum PermType {
    MENU = 'menu',
    FUNC = 'func',
}

export enum VodType {
    MOVIE = 'movie',
    SERIES = 'series',
}

export enum VodStatus {
    OFFLINE,
    ONLINE,
}

export enum DictTag {
    // GENRES = 'genres',
    // COUNTRIES = 'countries',   // https://zh.wikipedia.org/wiki/ISO_3166-1
}

export enum RedisKey {
    // HKEY_ROLE_PERMS = 'ROLE_PERMS',
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
