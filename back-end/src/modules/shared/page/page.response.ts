export class PageResponse<T> {

    readonly totalPages: number;
    readonly offset: number;

    constructor(readonly page: number, readonly pageSize: number, readonly items: T[], readonly totalItems: number) {
        this.totalPages = Math.floor((totalItems + pageSize - 1) / pageSize);
        this.offset = (page - 1) * pageSize;
    }

    isFirst(): boolean {
        return !this.hasPrevious();
    }

    isLast(): boolean {
        return !this.hasNext();
    }

    hasPrevious(): boolean {
        return this.page > 1;
    }

    hasNext(): boolean {
        return this.page < this.totalPages;
    }

}
