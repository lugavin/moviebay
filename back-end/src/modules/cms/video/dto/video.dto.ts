export interface VideoDto {
    readonly type?: string;
    readonly genres?: string | string[];
    readonly countries?: string | string[];
    readonly sort?: string;
}
