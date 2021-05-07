/**
 * 在TypeScript里, 接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约;
 * 在TypeScript里, 我们只会去关注值的外形, 只要两个类型内部的结构兼容那么这两个类型就是兼容的;
 * 这就允许我们在实现接口时只要保证包含了接口要求的结构就可以, 而不必明确地使用Implements语句.
 */
export interface AuthSubject {
    readonly uid: number;
    readonly username: string;
    readonly clientip: string;
    readonly roles: string[];
}
