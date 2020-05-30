import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('sys_auth')
export class AuthEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({nullable: true})
    device: string;

    @Column({name: 'refresh_token', unique: true})
    refreshToken: string;

    @Column({name: 'created_at'})
    createdAt: Date;

    @Column({name: 'expired_at'})
    expiredAt: Date;

}
