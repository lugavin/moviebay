import {IsInt} from 'class-validator';

export class PageReq<T> {
    @IsInt()
    readonly page: number;
    @IsInt()
    readonly pageSize: number;
    readonly params: T;
}
