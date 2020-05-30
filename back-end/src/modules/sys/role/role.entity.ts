import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import {PermEntity} from '../perm/perm.entity';
import {UserEntity} from '../user/user.entity';
import {BaseEntity} from '../../../shared';

/**
 * 角色信息
 */
@Entity('sys_role')
export class RoleEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    code: string;

    @Column()
    name: string;

    @Column({nullable: true})
    remark: string;

    @ManyToMany(type => UserEntity, user => user.roles)
    users: UserEntity[];

    @ManyToMany(type => PermEntity, perm => perm.roles)
    @JoinTable({
        name: 'sys_role_perm',
        joinColumn: {name: 'role_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'perm_id', referencedColumnName: 'id'}
    })
    perms: PermEntity[];

}
