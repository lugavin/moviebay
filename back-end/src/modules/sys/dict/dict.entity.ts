import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

/**
 * 字典信息
 */
@Entity('sys_dict')
export class DictEntity {

    @PrimaryGeneratedColumn()
    id: number;

    // @Column()
    // pid: number;

    @Column()
    label: string;

    @Column()
    value: string;

    @Column()
    seq: number; // 排序号

    @Column()
    tag: string; // 分类标签

    @Column()
    remark: string;

}
