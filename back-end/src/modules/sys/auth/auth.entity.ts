import {Entity, Column, PrimaryGeneratedColumn, Index} from 'typeorm';

@Entity('sys_auth')
export class AuthEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uid: number;

    @Column()
    clientip: string;

    @Index({unique: true})
    @Column({name: 'refresh_token'})
    refreshToken: string;

    @Column({name: 'created_at'})
    createdAt: Date;

    @Column({name: 'expired_at'})
    expiredAt: Date;

}
