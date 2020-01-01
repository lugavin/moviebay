import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {

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
    activated: string;

    @Column({nullable: true})
    activationKey: string;

    @Column({nullable: true})
    resetKey: string;

    @Column({nullable: true})
    resetDate: Date;

    @Column()
    createdAt: Date;

    @Column()
    createdBy: string;

    @Column({nullable: true})
    updatedAt: Date;

    @Column({nullable: true})
    updatedBy: string;
}
