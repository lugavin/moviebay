import {Controller} from '@nestjs/common';
import {RoleService} from './role.service';

@Controller()
export class RoleResource {

    constructor(private readonly roleService: RoleService) {
    }

}
