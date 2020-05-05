export class PageRequest<T> {
    readonly page: number;
    readonly pageSize: number;
    readonly params: T;
}
