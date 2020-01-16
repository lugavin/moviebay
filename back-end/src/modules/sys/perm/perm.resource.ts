import {Controller} from '@nestjs/common';
import {PermService} from './perm.service';

@Controller('perms')
export class PermResource {

    constructor(private readonly permService: PermService) {
    }

}
