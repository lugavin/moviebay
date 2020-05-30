export class PageReq<T> {
    readonly page: number;
    readonly pageSize: number;
    readonly params: T;
}
