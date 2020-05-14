import {Entity, Index, Column, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from '../../shared/entity/base.entity';

@Entity('sys_auth')
export class AuthEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    openid: string;

    @Column({name: 'refresh_token', unique: true})
    refreshToken: string;

}
