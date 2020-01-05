import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

/**
 * 字典信息
 */
@Entity('sys_dict')
export class Dict {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pid: number;

    @Column()
    value: string;

    @Column()
    label: string;

    @Column()
    tag: string;

    @Column('int')
    seq: number;

    @Column()
    remark: string;

}