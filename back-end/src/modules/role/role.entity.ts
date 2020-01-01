import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @Column({nullable: true})
    remark: string;

}
