import {Controller} from '@nestjs/common';
import {PermService} from './perm.service';

@Controller()
export class PermResource {

    constructor(private readonly permService: PermService) {
    }

}
