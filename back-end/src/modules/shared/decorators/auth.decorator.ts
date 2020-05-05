import {SetMetadata} from '@nestjs/common';
import Consts from '../util/consts';

/**
 * ``` ts
 * export declare function decoratorName(args): ClassDecorator;
 * ```
 *
 * @see https://docs.nestjs.com/custom-decorators
 */
export const Auth = (...perms: string[]) => SetMetadata(Consts.PERMS_KEY, perms);
