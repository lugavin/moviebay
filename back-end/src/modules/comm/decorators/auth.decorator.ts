import {SetMetadata} from '@nestjs/common';
import {Constants} from '../constants';

export const Auth = (...perms: string[]) => SetMetadata(Constants.PERMS_KEY, perms);