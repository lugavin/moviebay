import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {RoleEntity} from '../role/role.entity';
import {BaseEntity, PermType} from 'src/shared';

/**
 * 权限信息
 */
@Entity('sys_perm')
export class PermEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    code: string;

    @Column()
    name: string;

    @Column()
    type: PermType;

    @Column({nullable: true})
    icon: string;

    @Column({nullable: true})
    url: string;

    @Column('int')
    seq: number;

    @Column({name: 'is_parent', type: 'bit'})
    isParent: boolean;

    @JoinColumn({name: 'pid'})
    @ManyToOne(type => PermEntity, parent => parent.children, {nullable: true})
    parent: PermEntity;

    @OneToMany(type => PermEntity, perm => perm.parent)
    children: PermEntity[];

    @ManyToMany(type => RoleEntity, role => role.perms)
    roles: RoleEntity[];

}
