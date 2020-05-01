import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from '../../shared/entity/base.entity';

/**
 * 字典信息
 */
@Entity('sys_dict')
export class DictEntity extends BaseEntity {

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
