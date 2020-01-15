import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {RoleEntity} from '../role/role.entity';

/**
 * 权限信息
 */
@Entity('sys_perm')
export class PermEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column({nullable: true})
    icon: string;

    @Column({nullable: true})
    url: string;

    @Column('int')
    seq: string;

    @Column({name: 'is_parent', type: 'bit'})
    isParent: boolean;

    @Column({nullable: true})
    pid: number;

    @ManyToMany(type => RoleEntity, role => role.perms)
    roles: RoleEntity[];

}
