import {Controller} from '@nestjs/common';
import {RoleService} from './role.service';

@Controller('roles')
export class RoleResource {

    constructor(private readonly roleService: RoleService) {
    }

}
