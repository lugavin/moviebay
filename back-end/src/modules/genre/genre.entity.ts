import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Genre {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pid: number;

    @Column()
    tag: string;

    @Column()
    title: string;

    @Column('int')
    sort: number;

}