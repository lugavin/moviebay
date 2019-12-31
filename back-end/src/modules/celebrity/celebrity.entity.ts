import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Celebrity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    remark: string;

    @Column()
    createdAt: Date;

    @Column()
    createdBy: string;

    @Column({nullable: true})
    updatedAt: Date;

    @Column({nullable: true})
    updatedBy: string;

}