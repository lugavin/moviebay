import {SetMetadata} from '@nestjs/common';
import {Constants} from '../util/constants';

/**
 * ``` ts
 * export declare function decoratorName(args): ClassDecorator;
 * ```
 *
 * @see https://docs.nestjs.com/custom-decorators
 */
export const Auth = (...perms: string[]) => SetMetadata(Constants.PERMS_KEY, perms);