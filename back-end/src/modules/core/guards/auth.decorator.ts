import {SetMetadata} from '@nestjs/common';
import {Consts} from 'src/shared';

/**
 * ``` ts
 * export declare function decoratorName(args): ClassDecorator;
 * ```
 *
 * @see https://docs.nestjs.com/custom-decorators
 */
export const AuthDecorator = (...perms: string[]) => SetMetadata(Consts.AUTH_KEY, perms);
