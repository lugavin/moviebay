import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import {PermEntity} from '../perm/perm.entity';

/**
 * 角色信息
 */
@Entity('sys_role')
export class RoleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @Column({nullable: true})
    remark: string;

    @ManyToMany(type => PermEntity)
    @JoinTable({
        name: 'sys_role_perm',
        joinColumn: {name: 'role_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'perm_id', referencedColumnName: 'id'}
    })
    perms: PermEntity[];

}