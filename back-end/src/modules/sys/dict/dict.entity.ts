import {Entity, Index, Column, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from 'src/shared';

/**
 * 字典信息
 */
@Entity('sys_dict')
@Index(['value', 'tag'], {unique: true})
export class DictEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

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
