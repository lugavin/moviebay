import {SetMetadata} from '@nestjs/common';
import {Consts} from '../util/constants';

export const Auth = (...perms: string[]) => SetMetadata(Consts.PERMS_KEY, perms);