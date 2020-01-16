import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {RoleEntity} from '../role/role.entity';
import {BaseEntity} from '../../shared/entity/base.entity';

/**
 * 用户信息
 */
@Entity('sys_user')
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({nullable: true})
    nickname: string;

    @Column({nullable: true})
    salt: string;

    @Column({nullable: true})
    phone: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    avatar: string;

    @Column()
    activated: boolean;

    @Column({name: 'activation_key', nullable: true})
    activationKey: string;

    @Column({name: 'reset_key', nullable: true})
    resetKey: string;

    @Column({name: 'reset_date', nullable: true})
    resetDate: Date;

    @ManyToMany(type => RoleEntity, role => role.users)
    @JoinTable({
        name: 'sys_user_role',
        joinColumn: {name: 'user_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'role_id', referencedColumnName: 'id'}
    })
    roles: RoleEntity[];

}
