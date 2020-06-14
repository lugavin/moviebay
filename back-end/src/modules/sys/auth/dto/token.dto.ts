export interface TokenDto {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly expiresIn: number;
}
