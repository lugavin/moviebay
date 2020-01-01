import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Permission {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column({nullable: true})
    icon: string;

    @Column({nullable: true})
    url: string;

    @Column('int')
    seq: string;

    @Column('bit')
    isParent: boolean;

    @Column({nullable: true})
    pid: number;

}
